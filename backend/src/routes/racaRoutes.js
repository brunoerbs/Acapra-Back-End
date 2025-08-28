import { listarRacas, retornarRaca, criarRaca, inativarRaca, atualizarRaca } from "./raca.js"

export default async function racasRoutes(app) {
  app.get("/", listarRacas)
  app.get("/:id", retornarRaca)
  app.post("/", criarRaca)
  app.put("/:id", inativarRaca)
  app.put("/", atualizarRaca)
}
