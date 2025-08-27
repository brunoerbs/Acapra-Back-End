import { listarUsuarios, retornarUsuario, criarUsuario, inativarUsuario, atualizarUsuario } from "./usuario.js"

export default async function petsRoutes(app) {
  app.get("/", listarUsuarios)
  app.get("/:id", retornarUsuario)
  app.post("/", criarUsuario)
  app.put("/:id", inativarUsuario)
  app.put("/", atualizarUsuario)
}
