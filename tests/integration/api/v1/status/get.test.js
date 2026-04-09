test("GET deveria retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status/");
  console.log(response.status);
  if (response.status == 200) {
    console.log("Conexão Estabelecida");
  } else {
    console.log("Falha na conexão");
  }
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  console.log(parsedUpdatedAt);
  console.log("UPDATED_AT: " + responseBody.updated_at);
  expect(parsedUpdatedAt).toEqual(responseBody.updated_at);

  console.log("VERSION: " + responseBody.dependencies.version);
  expect(responseBody.dependencies.version).toEqual("16.0");

  console.log("MAX_CONNECTIONS: " + responseBody.dependencies.max_connections);
  expect(responseBody.dependencies.max_connections).toEqual(100);

  console.log(
    "OPENED_CONNECTIONS: " + responseBody.dependencies.opened_connections,
  );
  expect(responseBody.dependencies.opened_connections).toEqual(1);
});
