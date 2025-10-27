import { listarPets, retornarPet, criarPet, inativarPet, atualizarPet } from "./pets.js"

export default async function petsRoutes(app) {
  app.get("/", listarPets)
  app.get("/retornarPet/:id_pet", retornarPet)
  app.post("/", criarPet)
  app.put("/:id", inativarPet)
  app.put("/", atualizarPet)
}
