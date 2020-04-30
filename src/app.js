const express = require("express");
const cors = require("cors");
const {uuid, isUuid} = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const verifyId = (req, res, next) => {
  const {id} = request.params

  if(!isUuid(id)) {
    return response.status(400).json({error: "id que voce passou ta errado"})
  }
  return next()
}
app.get("/repositories", (request, response) => {

  return response.json(repositories)
  // TODO
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)

  return response.json(repository)
  // TODO
});

app.put("/repositories/:id",verifyId, (request, response) => {
  const {id} = request.params
  const {title, url, techs} = request.body
  const repositoryIndex = repositories.findIndex(repository => repository.id == id)

  if(repositoryIndex < 0) {
    return response.status(400).json({error: 'id informado nao confere'})
  }

  const repository = {
    ...repositories[repositoryIndex],
    title: title ? title: repositories[repositoryIndex].title,
    url: url ? url: repositories[repositoryIndex].url,
    techs: techs ? techs : repositories[repositoryIndex].techs
  }
  repositories[repositoryIndex] = repository

  return response.json(repository)
  // TODO
});

app.delete("/repositories/:id",verifyId, (request, response) => {
  const {id} = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id == id)

  if(repositoryIndex < 0) {
    return response.status(400).json({error: 'id informado nao confere'})
  }

  repositories.slice(repositoryIndex, 1)
  return response.json({message: 'repo deletado com sucesso'})

  // TODO
});

app.post("/repositories/:id/like", verifyId, (request, response) => {
  const {id} = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id == id)

  if(repositoryIndex < 0) {
    return response.status(400).json({error: 'id informado nao confere'})
  }

  const repository = {
    ...repositories[repositoryIndex],
    likes: repositories[repositoryIndex].likes + 1
  }

  repositories[repositoryIndex] = repository

  return response.json({likes: repository.likes})
  // TODO
});

module.exports = app;
