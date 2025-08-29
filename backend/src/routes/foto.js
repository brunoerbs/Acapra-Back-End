import { supabase } from '../lib/supabaseClient.js'

// GET
export async function listarFotos(req, reply) {
  const { data, error } = await supabase
    .from('tb_foto_pet')
    .select('*')
  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { data }
}

export async function retornarFoto(req, reply) {
  const { id } = req.params
  const { data, error } = await supabase
    .from('tb_foto_pet')
    .select('*')
    .eq('id_foto_pet', id)
  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { data }
}

export async function retornarFotosPorPet(req, reply) {
  const { id_pet } = req.params
  const { data, error } = await supabase
    .from('tb_foto_pet')
    .select('*')
    .eq('id_pet', id_pet)
  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { data }
}

// POST
export async function criarFoto(req, reply) {
  const foto = req.body;
  const { data, error } = await supabase
    .from('tb_foto_pet')
    .insert([foto]).select();

  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { success: true, 
    data: data[0].id_foto, 
    message: "Foto criada com sucesso" }
}

//PUT
export async function atualizarFoto(req, reply) {
  const visita = req.body;

  if (!visita.id_foto) {
    return reply.code(400).send({ error: "O campo 'id_foto_pet' é obrigatório" });
  }

  const { id_foto, ...dadosParaAtualizar } = visita;

  const { data, error } = await supabase
    .from('tb_foto_pet')
    .update(dadosParaAtualizar)
    .eq('id_foto_pet', id_foto);

  if (error) return reply.code(500).send({ success: false, error: error.message });

  return { success: true, 
    data: data[0], 
    message: `Foto ${id_foto} atualizada.` };
}

export async function deletarFoto(req, reply) {
  const { id } = req.params
  const { error } = await supabase
    .from('tb_foto_pet')
    .delete()
    .eq('id_foto_pet', id)
  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { success: true, 
    message: `Foto ${id} deletada.` };
}
