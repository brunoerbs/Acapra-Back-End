import Fastify from "fastify"
import cors from "@fastify/cors"
import petsRoutes from "./routes/petsRoutes.js"
import visitaRoutes from "./routes/visitaRoutes.js"
import usuarioRoutes from "./routes/usuarioRoutes.js"
import racaRoutes from "./routes/racaRoutes.js"
import fotoRoutes from "./routes/fotoRoutes.js"
import vacinaRoutes from "./routes/vacinaRoutes.js";
import doencaRoutes from "./routes/doencaRoutes.js"
import historicoDoencaRoutes from "./routes/historicoDoencaRoutes.js"
import historoVacinaRoutes from "./routes/historicoVacinaRoutes.js"
import adocaoRoutes from "./routes/adocaoRoutes.js"

const app = Fastify()

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
})

app.register(petsRoutes, { prefix: "/pet" })
app.register(visitaRoutes, { prefix: "/visita" })
app.register(usuarioRoutes, { prefix: "/usuario" })
app.register(fotoRoutes, { prefix: "/foto" })
app.register(vacinaRoutes, { prefix: "/vacina" });
app.register(doencaRoutes, { prefix: "/doenca" })
app.register(racaRoutes, { prefix: "/raca" })
app.register(historicoDoencaRoutes, {prefix:"/historicoDoenca"})
app.register(historoVacinaRoutes,{prefix:"/historicoVacina"})
app.register(adocaoRoutes, { prefix: "/adocao" })

app.get("/", async () => {
  return { status: "API online" }
})

app.listen({ port: 3001 })
