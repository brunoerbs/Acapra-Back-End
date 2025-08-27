import { listarVacinas,criarVacina,atualizarVacina,inativarVacina } from "./vacina.js";

export default async function vacinasRoutes(app) {
  app.get("/listarVacinas", listarVacinas);
  app.post("/criarVacina", criarVacina);
  app.put("/atualizarVacina", atualizarVacina);
  app.put("/inativarVacina/:id_vacina", inativarVacina)
}