import { listarVisitas, retornarVisita, criarVisita, cancelarVisita, atualizarVisita } from "./visita.js"

export default async function petsRoutes(app) {
  app.get("/", listarVisitas)
  app.get("/:id", retornarVisita)
  app.post("/", criarVisita)
  app.put("/:id", cancelarVisita)
  app.put("/", atualizarVisita)
}
