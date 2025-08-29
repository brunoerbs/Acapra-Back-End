import { supabase } from '../lib/supabaseClient.js'

export async function criarAdocao(req, reply) {
    const userId = req.body.id_usuario
    if (!userId) {
        return reply.code(401).send({ error: "Usuário não autenticado" })
    }
    const adocao = req.body
    adocao.id_usuario = userId
    const { data, error } = await supabase
        .from('tb_adocao')
        .insert([adocao])
    if (error) return reply.code(500).send({ error: error.message })
    return { message: "Adoção registrada com sucesso", data }
}

export async function retornarAdocao(req, reply) {
    const { id } = req.params
    const { data, error } = await supabase
        .from('tb_adocao')
        .select('*')
        .eq('id_adocao', id)
    if (error) return reply.code(500).send({ success: false, error: error.message })
    return { data }
}

export async function listarAdocoes(req, reply) {
    const { data, error } = await supabase
        .from('tb_adocao')
        .select('*')
    if (error) return reply.code(500).send({ success: false, error: error.message })
    return { data }
}

export async function listarAdocoesPorUsuario(req, reply) {
    const userId = Number(req.params.id_usuario);
    if (isNaN(userId) || userId <= 0) {
        return reply.code(400).send({ error: "ID de usuário inválido" });
    }
    if (!userId) {
        return reply.code(401).send({ error: "Usuário não autenticado" })
    }
    const { data, error } = await supabase
        .from('tb_adocao')
        .select('*')
        .eq('id_usuario', userId)
    if (error) return reply.code(500).send({ success: false, error: error.message })
    return { data }
}

export async function inativarAdocao(req, reply) {
    const { id } = req.params
    const { data, error } = await supabase
        .from('tb_adocao')
        .update({ tb_adocao_inativo: true })
        .eq('id_adocao', id)
    if (error) return reply.code(500).send({ success: false, error: error.message })
    return { success: true, data: data, message: `Adoção ${id} inativada.` }
}

export async function atualizarAdocao(req, reply) {
  const adocao = req.body;

  if (!adocao.id_adocao) {
    return reply.code(400).send({ error: "O campo 'id_adocao' é obrigatório" });
  }

  const { id_adocao, ...dadosParaAtualizar } = adocao;

  const { data, error } = await supabase
    .from('tb_adocao')
    .update(dadosParaAtualizar)
    .eq('id_adocao', id_adocao);

  if (error) {
    return reply.code(500).send({ error: error.message });
  }

  return {
    message: `Adoção ${id_adocao} atualizada completamente`,
    data,
  };
}