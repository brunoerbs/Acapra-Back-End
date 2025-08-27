import { listarUsuarios, retornarUsuario, login, criarUsuario, inativarUsuario, atualizarUsuario } from "./usuario.js"

export default async function usuarioRoutes(app) {
  app.get("/", listarUsuarios)
  app.get("/:id", retornarUsuario)
  app.get("/login", login)
  app.post("/", criarUsuario)
  app.put("/:id", inativarUsuario)
  app.put("/", atualizarUsuario)
}
