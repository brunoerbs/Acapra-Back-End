import Fastify from "fastify";
import petsRoutes from "./routes/pets.js";

const app = Fastify();

app.register(petsRoutes, { prefix: "/pets" });

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Servidor http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();