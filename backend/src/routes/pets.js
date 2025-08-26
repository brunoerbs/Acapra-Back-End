//GET

import { supabase } from "../lib/supabaseClient.js";

export default async function petsRoutes(fastify, options) {

  fastify.get("/", async (req, reply) => {
    const { data, error } = await supabase.from("tb_pet").select("*");
    if (error) return reply.code(500).send({ error: error.message });
    return { data };
  });

  fastify.post("/", async (req, reply) => {
    const { nome, tipo } = req.body;
    const { data, error } = await supabase
      .from("tb_pet")
      .insert([{ nome, tipo }]);

    if (error) return reply.code(500).send({ error: error.message });
    return { data };
  });
}