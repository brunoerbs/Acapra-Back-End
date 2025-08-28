import { listarDoencas, retornarDoenca, criarDoenca, inativarDoenca, atualizarDoenca } from "./doenca.js";

export default async function doencaRoutes(app) {
    app.get("/", listarDoencas);
    app.get("/:id", retornarDoenca);
    app.post("/", criarDoenca);
    app.put("/:id", inativarDoenca);
    app.put("/", atualizarDoenca);
}
