import { supabase } from '../lib/supabaseClient.js'

// GET
export async function listarPets(req, reply) {
  const { data, error } = await supabase
    .from('tb_pet')
    .select('*')
    //.eq('tb_pet_inativo', true)
  if (error) return reply.code(500).send({ error: error.message })
  return { data }
}

// POST
export async function criarPet(req, reply) {
  const pet = req.body  
  const { data, error } = await supabase
    .from('tb_pet')
    .insert([pet])

  if (error) return reply.code(500).send({ error: error.message })
  return { message: "Pet criado com sucesso", data }
}

// PUT
export async function inativarPet(req, reply) {
  const { id } = req.params

  const { data, error } = await supabase
    .from('tb_pet')
    .update({ tb_pet_inativo: false })
    .eq('id_pet', id)

  if (error) return reply.code(500).send({ error: error.message })
  return { message: `Pet ${id} marcado como inativo`, data }
}

//PUT
export async function atualizarPetCompleto(req, reply) {
  const pet = req.body;

  if (!pet.id_pet) {
    return reply.code(400).send({ error: "O campo 'id_pet' é obrigatório" });
  }

  const { id_pet, ...dadosParaAtualizar } = pet;

  const { data, error } = await supabase
    .from('tb_pet')
    .update(dadosParaAtualizar)
    .eq('id_pet', id_pet);

  if (error) return reply.code(500).send({ error: error.message });

  return { message: `Pet ${id_pet} atualizado completamente`, data };
}
