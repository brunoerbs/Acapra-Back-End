import { listarRacas, criarRaca, inativarRaca, atualizarRacaCompleto } from "./raca.js"

export default async function racasRoutes(app) {
  app.get("/", listarRacas)
  app.post("/", criarRaca)
  app.put("/:id", inativarRaca)
  app.put("/", atualizarRacaCompleto)
}
