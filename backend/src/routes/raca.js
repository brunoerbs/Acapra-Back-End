import { supabase } from '../lib/supabaseClient.js'

// GET
export async function listarRacas(req, reply) {
  const { data, error } = await supabase
    .from('tb_raca')
    .select('*')
    //.eq('tb_raca_inativo', false) // se quiser filtrar só ativos

  if (error) return reply.code(500).send({ error: error.message })
  return { data }
}

// POST
export async function criarRaca(req, reply) {
  const raca = req.body  
  const { data, error } = await supabase
    .from('tb_raca')
    .insert([raca])

  if (error) return reply.code(500).send({ error: error.message })
  return { message: "Raça criada com sucesso", data }
}

// PUT - inativar
export async function inativarRaca(req, reply) {
  const { id } = req.params

  const { data, error } = await supabase
    .from('tb_raca')
    .update({ tb_raca_inativo: true }) // inativo = true
    .eq('id_raca', id)

  if (error) return reply.code(500).send({ error: error.message })
  return { message: `Raça ${id} marcada como inativa`, data }
}

// PUT - atualizar completo
export async function atualizarRacaCompleto(req, reply) {
  const raca = req.body;

  if (!raca.id_raca) {
    return reply.code(400).send({ error: "O campo 'id_raca' é obrigatório" });
  }

  const { id_raca, ...dadosParaAtualizar } = raca;

  const { data, error } = await supabase
    .from('tb_raca')
    .update(dadosParaAtualizar)
    .eq('id_raca', id_raca);

  if (error) return reply.code(500).send({ error: error.message });

  return { message: `Raça ${id_raca} atualizada completamente`, data };
}






