import { supabase } from '../lib/supabaseClient.js'
import bcrypt from "bcryptjs";

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

export async function login(req, reply) {
  const { email, senha } = req.headers;
  const { data, error } = await supabase
    .from('tb_usuario')
    .select('id_usuario, tb_usuario_email, tb_usuario_senha, tb_usuario_nome, tb_usuario_admin')
    .eq('tb_usuario_email', email);

  if (error) return reply.code(500).send({ error: error.message })
  if (!data || data.length === 0) return reply.code(401).send({ success: false, message: "Credenciais inválidas." });

  const usuario = data[0];
  console.log('usuario', usuario);

  const ok = await bcrypt.compare(senha ?? "", usuario.tb_usuario_senha);
  if (!ok) return reply.code(401).send({ success: false, message: "Credenciais inválidas." });

  const usuarioRetorno = {
    id: usuario.id_usuario,
    nome: usuario.tb_usuario_nome,
    admin: usuario.tb_usuario_admin
  }

  return { success: true, 
    data: usuarioRetorno, 
    message: "Login efetuado com sucesso." }
}

// POST
export async function criarUsuario(req, reply) {
  const senhaHash = await bcrypt.hash(req.body.tb_usuario_senha ?? "", 12);

  const usuario = {
    ...req.body,
    tb_usuario_senha: senhaHash,
    tb_usuario_inativo: false
  }
  const { data, error } = await supabase
    .from('tb_usuario')
    .insert([usuario]).select();

  if (error) return reply.code(500).send({ success: false, error: error.message })
  return {
    success: true,
    data: data[0].id_usuario,
    message: "Usuário criado com sucesso."
  }
}

// PUT
export async function inativarUsuario(req, reply) {
  const { id } = req.params

  const { data, error } = await supabase
    .from('tb_usuario')
    .update({ tb_usuario_inativo: true })
    .eq('id_usuario', id)

  if (error) return reply.code(500).send({ success: false, error: error.message })
  return {
    success: true,
    data: data[0],
    message: `Usuário ${id} inativado.`
  }
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
    .eq('id_usuario', id_usuario)
    .select();

  if (error) return reply.code(500).send({ success: false, error: error.message });

  return { success: true, 
    data: data[0], 
    message: `Usuário ${id_usuario} atualizado.` };
}