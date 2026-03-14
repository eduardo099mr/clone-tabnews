import database from "infra/database";

async function status(request, response) {
  response.status(200).json({ chave: "Resposta da requisição" });
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
}

export default status;
