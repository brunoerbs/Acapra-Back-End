import Fastify from "fastify"
import petsRoutes from "./routes/petsRoutes.js"
import visitaRoutes from "./routes/visitaRoutes.js"
import usuarioRoutes from "./routes/usuarioRoutes.js"
import vacinasRoutes from "./routes/vacinaRoutes.js";
import doencaRoutes from "./routes/doencaRoutes.js"

const app = Fastify()

app.register(petsRoutes, { prefix: "/pets" })
app.register(visitaRoutes, { prefix: "/visita" })
app.register(usuarioRoutes, { prefix: "/usuario" })
app.register(vacinasRoutes, { prefix: "/vacinas" });
app.register(doencaRoutes, { prefix: "/doenca" })

app.get("/", async () => {
  return { status: "API online" }
})

app.listen({ port: 3001 })