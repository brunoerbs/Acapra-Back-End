import { listarDoencas, criarDoenca, inativarDoenca, atualizarDoencaCompleto } from "./doenca.js";

export default async function doencaRoutes(app) {
    app.get("/", listarDoencas);
    app.post("/", criarDoenca);
    app.put("/:id", inativarDoenca);
    app.put("/", atualizarDoencaCompleto);
}
