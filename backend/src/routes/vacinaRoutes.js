import { listarVacinas, retornarVacina, criarVacina, atualizarVacina, inativarVacina } from "./vacina.js";

export default async function vacinasRoutes(app) {
  app.get("/", listarVacinas);
  app.get("/:id", retornarVacina);
  app.post("/", criarVacina);
  app.put("/:id", inativarVacina)
  app.put("/", atualizarVacina);
}