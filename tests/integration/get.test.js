test("GET deveria retornar 200", async () => {
  const resolve = await fetch("http://localhost:3000/api/v1/status/");
  console.log(resolve.status);
  if (resolve.status == 200) {
    console.log("Conexão Estabelecida");
  } else {
    console.log("Falha na conexão");
  }
  expect(resolve.status).toBe(200);
});
