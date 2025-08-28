import { supabase } from "../lib/supabaseClient.js";

export async function listarVacinas(req, reply) {
  const { data, error } = await supabase.from("tb_vacina").select("*");
  if (error) return reply.code(500).send({ error: error.message });
  return { 
        data, 
        success: true,
    };
}

export async function criarVacina(req, reply) {
  const { tb_vacina_nome, tb_vacina_data_vacina } = req.body;

  const { data, error } = await supabase
    .from("tb_vacina")
    .insert([
      {
        tb_vacina_nome,
        tb_vacina_data_vacina
      }
    ])
    .select(); 
  if (error) return reply.code(500).send({ success: false, error: error.message });

  return { 
    success: true, 
    data: data[0], 
    message: "Vacina criada com sucesso"
  };
}

export async function atualizarVacina(req, reply) {
  const { id_vacina } = req.query; 
  const { tb_vacina_nome, tb_vacina_data_vacina, tb_vacina_inativo } = req.body;

  if (!id_vacina) {
    return reply.code(400).send({ success: false, message: "id_vacina é obrigatório" });
  }

  try {
    const { data, error } = await supabase
      .from("tb_vacina")
      .update({ tb_vacina_nome, tb_vacina_data_vacina, tb_vacina_inativo })
      .eq("id_vacina", id_vacina)
      .select();

    if (error) return reply.code(500).send({ success: false, error: error.message });
    if (!data || data.length === 0)
      return reply.code(404).send({ success: false, message: "Vacina não encontrada" });

    return {
      success: true,
      data: data[0],
      message: "Vacina atualizada com sucesso"
    };
  } catch (err) {
    return reply.code(500).send({ success: false, error: err.message });
  }
}

export async function inativarVacina(req, reply) {
  const { id_vacina } = req.params

  const { data, error } = await supabase
    .from('tb_vacina')
    .update({ tb_vacina_inativo: true }) 
    .eq('id_vacina', id_vacina)

  if (error) return reply.code(500).send({ error: error.message })
  return { message: `Vacina ${id_vacina} marcada como inativa`, data }
}


