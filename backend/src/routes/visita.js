import { supabase } from '../lib/supabaseClient.js'

// GET
export async function listarVisitas(req, reply) {
  const { data, error } = await supabase
    .from('tb_agenda_visita')
    .select('*')
  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { data }
}

export async function retornarVisita(req, reply) {
  const { id } = req.params
  const { data, error } = await supabase
    .from('tb_agenda_visita')
    .select('*')
    .eq('id_agenda_visita', id)
  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { data }
}

// POST
export async function criarVisita(req, reply) {
  const visita = {
    ...req.body,
    tb_agenda_visita_inativo: false
  }
  const { data, error } = await supabase
    .from('tb_agenda_visita')
    .insert([visita]).select();

  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { success: true, 
    data: data[0].id_agenda_visita, 
    message: "Visita agendada com sucesso" }
}

// PUT
export async function cancelarVisita(req, reply) {
  const { id } = req.params

  const { data, error } = await supabase
    .from('tb_agenda_visita')
    .update({ tb_agenda_visita_inativo: true })
    .eq('id_agenda_visita', id)

  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { success: true, 
    data: data[0], 
    message: `Visita ${id} cancelada.` }
}

//PUT
export async function atualizarVisita(req, reply) {
  const visita = req.body;

  if (!visita.id_agenda_visita) {
    return reply.code(400).send({ error: "O campo 'id_agenda_visita' é obrigatório" });
  }

  const { id_agenda_visita, ...dadosParaAtualizar } = visita;

  const { data, error } = await supabase
    .from('tb_agenda_visita')
    .update(dadosParaAtualizar)
    .eq('id_agenda_visita', id_agenda_visita);

  if (error) return reply.code(500).send({ success: false, error: error.message });

  return { success: true, 
    data: data[0], 
    message: `Visita ${id_agenda_visita} atualizada.` };
}
