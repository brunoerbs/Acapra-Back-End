import { supabase } from '../lib/supabaseClient.js'

// GET
export async function listarRacas(req, reply) {
  const { data, error } = await supabase
    .from('tb_raca')
    .select('*')
  //.eq('tb_raca_inativo', false) // se quiser filtrar só ativos

  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { data }
}

export async function retornarRaca(req, reply) {
    const { id } = req.params
    const { data, error } = await supabase
        .from('tb_raca')
        .select('*')
        .eq('id_raca', id)
    if (error) return reply.code(500).send({ success: false, error: error.message })
    return { data }
}

// POST
export async function criarRaca(req, reply) {
  const raca = {
    ...req.body,
    tb_raca_inativo: false
  }
  const { data, error } = await supabase
    .from('tb_raca')
    .insert([raca])
    .select();

  if (error) return reply.code(500).send({ success: false, error: error.message })
  return {
        success: true,
        data: data[0].id_raca,
        message: "Raça criada com sucesso."
    }
}

// PUT - inativar
export async function inativarRaca(req, reply) {
  const { id } = req.params

  const { data, error } = await supabase
    .from('tb_raca')
    .update({ tb_raca_inativo: true })
    .eq('id_raca', id)

  if (error) return reply.code(500).send({ success: false, error: error.message })
  return {
        success: true,
        data: data[0],
        message: `Raça ${id} inativada.`
    }
}

// PUT - atualizar completo
export async function atualizarRaca(req, reply) {
  const raca = req.body;

  if (!raca.id_raca) {
    return reply.code(400).send({ error: "O campo 'id_raca' é obrigatório" });
  }

  const { id_raca, ...dadosParaAtualizar } = raca;

  const { data, error } = await supabase
    .from('tb_raca')
    .update(dadosParaAtualizar)
    .eq('id_raca', id_raca);

  if (error) return reply.code(500).send({ success: false, error: error.message });

  return {
        success: true,
        data: data[0],
        message: `Raça ${id_raca} atualizada.`
    };
}






