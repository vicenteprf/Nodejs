// Aula 1

// Buscando (require) todas as funcionalidade do express.
const express = require("express");

// Query params = ?nome=NodeJS
// Route Params = /curso/1
// Request Body = { nome: 'Nodejs', tipo: 'Backend' }

// console.log(express)

const server = express();

// localhost:3000/curso
// GET busca ou consulta informações de um servidor.
// O metodo GET recebe dois parâmetros, são eles req e res.
// req(request): Contém tudo o que o cliente envio para o servidor (parâmetros da URL, dados do body, query params e headers)
// res(response): É usado para enviar um resposta do servidor para o cliente. Ex: res.send('Olá), res.json({nome: 'Vicente}) e res.status(200)
server.get("/curso/:id", (req, res) => {
  // const nome = req.query.nome;

  const id = req.params.id;

  return res.json({ curso: `Curso ${id}` });
});

// listen é um método usado para vincular um servidor web a uma porta e nome de host específico.
server.listen(3000);
