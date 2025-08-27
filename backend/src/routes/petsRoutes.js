import { listarPets, criarPet, inativarPet, atualizarPetCompleto } from "./pets.js"

export default async function petsRoutes(app) {
  app.get("/", listarPets)
  app.post("/", criarPet)
  app.put("/:id", inativarPet)
  app.put("/", atualizarPetCompleto)
}
