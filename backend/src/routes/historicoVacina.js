import { supabase } from '../lib/supabaseClient.js'

// GET
export async function listarHistoricoVacina(req, reply) {
  try {
    const { id_his_vacina, id_pet, id_vacina } = req.query

    let query = supabase
      .from('tb_his_vacina')
      .select('*')

    if (id_his_vacina) query = query.eq('id_his_vacina', id_his_vacina)
    if (id_pet) query = query.eq('id_pet', id_pet)
    if (id_vacina) query = query.eq('id_vacina', id_vacina)

    const { data, error } = await query
    if (error) return reply.code(500).send({ success: false, error: error.message })

    return { success: true, data }
  } catch (err) {
    return reply.code(500).send({ success: false, error: err.message })
  }
}

// POST
export async function criarHistoricoVacina(req, reply) {
  try {
    const hisVacina = req.body

    if (!hisVacina.id_pet || !hisVacina.id_vacina) {
      return reply.code(400).send({ success: false, error: "Campos obrigatórios: id_pet, id_vacina" })
    }

    // data atual se não enviada
    hisVacina.tb_his_vacina_data_aplicacao = new Date().toISOString().split('T')[0]
    if (hisVacina.tb_his_vacina_inativo === undefined) hisVacina.tb_his_vacina_inativo = false

    const { data, error } = await supabase
      .from('tb_his_vacina')
      .insert([hisVacina])
      .select()

    if (error) return reply.code(500).send({ success: false, error: error.message })

    return { 
      success: true, 
      data: data[0], 
      message: "Histórico de vacina criado com sucesso" 
    }
  } catch (err) {
    return reply.code(500).send({ success: false, error: err.message })
  }
}

// PUT
export async function atualizarHistoricoVacina(req, reply) {
  try {
    const hisVacina = req.body

    if (!hisVacina.id_his_vacina) {
      return reply.code(400).send({ success: false, error: "O campo 'id_his_vacina' é obrigatório" })
    }

    const { id_his_vacina, tb_his_vacina_data_aplicacao, ...dadosParaAtualizar } = hisVacina

    // busca a data antiga caso não venha no body
    const { data: existingData, error: fetchError } = await supabase
      .from('tb_his_vacina')
      .select('tb_his_vacina_data_aplicacao')
      .eq('id_his_vacina', id_his_vacina)
      .single()

    if (fetchError) return reply.code(500).send({ success: false, error: fetchError.message })

    dadosParaAtualizar.tb_his_vacina_data_aplicacao = tb_his_vacina_data_aplicacao || existingData.tb_his_vacina_data_aplicacao

    const { data, error } = await supabase
      .from('tb_his_vacina')
      .update(dadosParaAtualizar)
      .eq('id_his_vacina', id_his_vacina)
      .select()

    if (error) return reply.code(500).send({ success: false, error: error.message })

    return { 
      success: true, 
      data: data[0], 
      message: `Histórico de vacina ${id_his_vacina} atualizado com sucesso` 
    }
  } catch (err) {
    return reply.code(500).send({ success: false, error: err.message })
  }
}
