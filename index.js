// Buscando (require) todas as funcionalidade do express.
// const express = require("express");

// Query params = ?nome=NodeJS
// Route Params = /curso/1
// Request Body = { nome: 'Nodejs', tipo: 'Backend' }

// console.log(express)

// const server = express();

// const cursos = ["Nodejs", "JavaScript", "TypeScript", "React Native"];

// localhost:3000/curso
// GET busca ou consulta informações de um servidor.
// O metodo GET recebe dois parâmetros, são eles req e res.
// req(request): Contém tudo o que o cliente envio para o servidor (parâmetros da URL, dados do body, query params e headers)
// res(response): É usado para enviar um resposta do servidor para o cliente. Ex: res.send('Olá), res.json({nome: 'Vicente}) e res.status(200)
// server.get("/curso/:index", (req, res) => {
// const nome = req.query.nome;

//   const { index } = req.params;

//   return res.json(cursos[index]);
// });

// listen é um método usado para vincular um servidor web a uma porta e nome de host específico.
// server.listen(3000);

// ----------------------------------------------------------------------------

// CRUD => Create, Read, Update, Delete

const express = require("express");

const server = express();

server.use(express.json());

const cursos = [
  "HTML",
  "CSS",
  "Tailwind",
  "JavaScript",
  "TypeScript",
  "React",
  "Nodejs",
];

// Middleware Global
server.use((req, res, next) => {
  console.log(`URL chamada: ${req.url}`);

  return next();
});

// Trantando erro no metado post/put
function checkCurso(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "Nome do curso é obrigatorio" });
  }

  return next();
}

function checkIndexCurso(req, res, next) {
  if (!cursos[req.params.index]) {
    return res.status(400).json({ error: "O curso não existe!" });
  }

  return next();
}

server.get("/cursos", (req, res) => {
  return res.json(cursos);
});

server.get("/cursos/:index", checkIndexCurso, (req, res) => {
  const { index } = req.params;

  return res.json(cursos[index]);
});

// Criando um novo curso
server.post("/cursos", checkCurso, (req, res) => {
  const { name } = req.body;

  cursos.push(name);

  return res.json(cursos);
});

// Atualizando o curso
server.put("/cursos/:index", checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
});

//Excluido algum curso
server.delete("/cursos/:index", checkIndexCurso, (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);

  return res.json({ message: "Curso deletado com sucesso!" });
});

server.listen(3000);
