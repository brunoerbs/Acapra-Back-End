import { supabase } from '../lib/supabaseClient.js'

// GET
export async function listarPets(req, reply) {
  const { data, error } = await supabase
    .from('tb_pet')
    .select('*')
  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { data }
}

export async function retornarPet(req, reply) {
  const { id_pet } = req.params
  const { data, error } = await supabase
    .from('tb_pet')
    .select('*')
    .eq('id_pet', id_pet)
  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { data }
}

// POST
export async function criarPet(req, reply) {
  const pet = {
    ...req.body,
    tb_pet_inativo: false,
    tb_pet_status_pet: 1,
    tb_pet_adotado: false
  }
  const { data, error } = await supabase
    .from('tb_pet')
    .insert([pet]).select();

  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { success: true, 
    data: data[0].id_pet, 
    message: "Pet criado com sucesso" }
}

// PUT
export async function inativarPet(req, reply) {
  const { id } = req.params

  const { data, error } = await supabase
    .from('tb_pet')
    .update({ tb_pet_inativo: true })
    .eq('id_pet', id)

  if (error) return reply.code(500).send({ success: false, error: error.message })
  return { success: true, 
    data: data[0], 
    message: `Pet ${id} inativado.` }
}

//PUT
export async function atualizarPet(req, reply) {
  const pet = req.body;

  if (!pet.id_pet) {
    return reply.code(400).send({ error: "O campo 'id_pet' é obrigatório." });
  }

  const { id_pet, ...dadosParaAtualizar } = pet;

  const { data, error } = await supabase
    .from('tb_pet')
    .update(dadosParaAtualizar)
    .eq('id_pet', id_pet);

  if (error) return reply.code(500).send({ success: false, error: error.message });

  return { success: true, 
    data: data[0], 
    message: `Pet ${id_pet} atualizado.` };
}
