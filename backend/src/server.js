import Fastify from "fastify"
import petsRoutes from "./routes/petsRoutes.js"

const app = Fastify()

app.register(petsRoutes, { prefix: "/pets" })

app.get("/", async () => {
  return { status: "API online" }
})

app.listen({ port: 3001 })