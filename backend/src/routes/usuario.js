import { supabase } from '../lib/supabaseClient.js'

// GET
export async function listarUsuarios(req, reply) {
  const { data, error } = await supabase
    .from('tb_usuario')
    .select('*')
  if (error) return reply.code(500).send({ error: error.message })
  return { data }
}

export async function retornarUsuario(req, reply) {
  const { id } = req.params
  const { data, error } = await supabase
    .from('tb_usuario')
    .select('*')
    .eq('id_usuario', id)
  if (error) return reply.code(500).send({ error: error.message })
  return { data }
}

// POST
export async function criarUsuario(req, reply) {
    const usuario = {
    ...req.body,
    tb_usuario_inativo: false
  } 
  const { data, error } = await supabase
    .from('tb_usuario')
    .insert([usuario])

  if (error) return reply.code(500).send({ error: error.message })
  return { message: "Usuário criado com sucesso", data }
}

// PUT
export async function inativarUsuario(req, reply) {
  const { id } = req.params

  const { data, error } = await supabase
    .from('tb_usuario')
    .update({ tb_usuario_inativo: true })
    .eq('id_usuario', id)

  if (error) return reply.code(500).send({ error: error.message })
  return { message: `Usuário ${id} inativado`, data }
}

//PUT
export async function atualizarUsuario(req, reply) {
  const usuario = req.body;

  if (!usuario.id_usuario) {
    return reply.code(400).send({ error: "O campo 'id_usuario' é obrigatório" });
  }

  const { id_usuario, ...dadosParaAtualizar } = usuario;

  const { data, error } = await supabase
    .from('tb_usuario')
    .update(dadosParaAtualizar)
    .eq('id_usuario', id_usuario);

  if (error) return reply.code(500).send({ error: error.message });

  return { message: `Usuário ${id_usuario} atualizado`, data };
}
