import { supabase } from '../lib/supabaseClient.js'

// GET
export async function listarHistoricoAdocao(req, reply) {
  try {
    const { id_historico_adocao, id_pet, id_usuario } = req.query

    let query = supabase
      .from('tb_historico_adocao')
      .select('*')

    if (id_historico_adocao) query = query.eq('id_historico_adocao', id_historico_adocao)
    if (id_pet) query = query.eq('id_pet', id_pet)
    if (id_usuario) query = query.eq('id_usuario', id_usuario)

    const { data, error } = await query
    if (error) return reply.code(500).send({ success: false, error: error.message })

    return { success: true, data }
  } catch (err) {
    return reply.code(500).send({ success: false, error: err.message })
  }
}

// POST
export async function criarHistoricoAdocao(req, reply) {
  try {
    const historico = req.body

    if (!historico.id_pet || !historico.id_usuario) {
      return reply.code(400).send({ 
        success: false, 
        error: "Campos obrigatórios: id_pet, id_usuario" 
      })
    }

    // data atual se não enviada
    historico.tb_historico_adocao_data_adocao = 
      historico.tb_historico_adocao_data_adocao || new Date().toISOString().split('T')[0]
    
    if (historico.tb_historico_adocao_inativo === undefined) {
      historico.tb_historico_adocao_inativo = false
    }

    if (historico.tb_historico_adocao_status_adocao === undefined) {
      historico.tb_historico_adocao_status_adocao = true // por padrão ativo/adotado
    }

    const { data, error } = await supabase
      .from('tb_historico_adocao')
      .insert([historico])
      .select()

    if (error) return reply.code(500).send({ success: false, error: error.message })

    return { 
      success: true, 
      data: data[0].id_historico_adocao, 
      message: "Histórico de adoção criado com sucesso" 
    }
  } catch (err) {
    return reply.code(500).send({ success: false, error: err.message })
  }
}

// PUT
export async function atualizarHistoricoAdocao(req, reply) {
  try {
    const historico = req.body

    if (!historico.id_historico_adocao) {
      return reply.code(400).send({ 
        success: false, 
        error: "O campo 'id_historico_adocao' é obrigatório" 
      })
    }

    const { id_historico_adocao, tb_historico_adocao_data_adocao, ...dadosParaAtualizar } = historico

    // busca a data antiga caso não venha no body
    const { data: existingData, error: fetchError } = await supabase
      .from('tb_historico_adocao')
      .select('tb_historico_adocao_data_adocao')
      .eq('id_historico_adocao', id_historico_adocao)
      .single()

    if (fetchError) return reply.code(500).send({ success: false, error: fetchError.message })

    dadosParaAtualizar.tb_historico_adocao_data_adocao = 
      tb_historico_adocao_data_adocao || existingData.tb_historico_adocao_data_adocao

    const { data, error } = await supabase
      .from('tb_historico_adocao')
      .update(dadosParaAtualizar)
      .eq('id_historico_adocao', id_historico_adocao)
      .select()

    if (error) return reply.code(500).send({ success: false, error: error.message })

    return { 
      success: true, 
      data: data[0], 
      message: `Histórico de adoção ${id_historico_adocao} atualizado com sucesso` 
    }
  } catch (err) {
    return reply.code(500).send({ success: false, error: err.message })
  }
}
