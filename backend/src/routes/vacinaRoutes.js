import { listarVacinas, criarVacina, atualizarVacina, inativarVacina } from "./vacina.js";

export default async function vacinasRoutes(app) {
  app.get("/", listarVacinas);
  app.post("/", criarVacina);
  app.put("/", atualizarVacina);
  app.put("/inativarVacina/:id_vacina", inativarVacina)
}