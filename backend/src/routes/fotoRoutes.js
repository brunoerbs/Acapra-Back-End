import { listarFotos, retornarFoto, retornarFotosPorPet, criarFoto, atualizarFoto, deletarFoto } from "./foto.js"

export default async function fotoRoutes(app) {
  app.get("/", listarFotos)
  app.get("/:id", retornarFoto)
  app.get("/retornarFotosPorPet/:id_pet", retornarFotosPorPet)
  app.post("/", criarFoto)
  app.put("/", atualizarFoto)
  app.delete("/:id", deletarFoto)
}
