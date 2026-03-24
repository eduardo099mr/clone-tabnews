import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const result_databasequery = await database.query("SHOW server_version;");
  const db_version = result_databasequery.rows[0].server_version;
  console.log("VERSION: " + db_version);

  const maxConnectiosresult = await database.query("SHOW max_connections;");
  const maxConnectiosValue = parseInt(
    maxConnectiosresult.rows[0].max_connections,
  );
  console.log("MAX_CONNECTIONS: " + maxConnectiosValue);

  const databaseName = process.env.POSTGRES_DB;
  const openedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WhERE datname = $1;",
    values: [databaseName],
  });
  console.log("OPENED_CONNECTIONS: " + openedConnectionsResult.rows[0].count);
  const openedConnectionsValue = openedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      version: db_version,
      max_connections: maxConnectiosValue,
      opened_connections: openedConnectionsValue,
    },
  });
}

export default status;
