import { criarAdocao, retornarAdocao , listarAdocoes, listarAdocoesPorUsuario, inativarAdocao, atualizarAdocao } from "./adocao.js";

export default async function adocaoRoutes(app) {
    app.post("/", criarAdocao);
    app.get("/retornarAdocao/:id", retornarAdocao);
    app.get("/", listarAdocoes);
    app.get("/listarAdocoesPorUsuario/:id_usuario", listarAdocoesPorUsuario);
    app.put("/:id", inativarAdocao);
    app.put("/atualizarAdocao", atualizarAdocao);
}