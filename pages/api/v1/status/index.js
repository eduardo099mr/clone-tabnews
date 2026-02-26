function status(request, response) {
  response.status(200).json({ chave: "Resposta da requisição" });
}

export default status;
