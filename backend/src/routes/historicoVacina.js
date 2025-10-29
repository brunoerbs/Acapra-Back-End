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

// GET por id_pet (query)
export async function listarHistoricoVacinaPorPet(req, reply) {
  try {
    const { id_pet } = req.query || {}

    if (!id_pet) {
      return reply.code(400).send({ success: false, error: "Parâmetro 'id_pet' é obrigatório" })
    }

    const { data, error } = await supabase
      .from('tb_his_vacina')
      .select('*')
      .eq('id_pet', id_pet)

    if (error) return reply.code(500).send({ success: false, error: error.message })

    const idsVacina = Array.from(new Set((data || [])
      .map((h) => h?.id_vacina)
      .filter((v) => v !== null && v !== undefined)))

    if (idsVacina.length > 0) {
      const { data: vacinas, error: vacinaError } = await supabase
        .from('tb_vacina')
        .select('id_vacina, tb_vacina_nome')
        .in('id_vacina', idsVacina)

      if (vacinaError) return reply.code(500).send({ success: false, error: vacinaError.message })

      const vacinaMap = new Map((vacinas || []).map((v) => [v.id_vacina, v.tb_vacina_nome]))
      const dataComNome = (data || []).map((h) => ({
        ...h,
        tb_vacina_nome: vacinaMap.get(h.id_vacina) ?? null,
      }))

      return { success: true, data: dataComNome }
    }

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

    hisVacina.tb_his_vacina_data_aplicacao = new Date().toISOString().split('T')[0]
    if (hisVacina.tb_his_vacina_inativo === undefined) hisVacina.tb_his_vacina_inativo = false

    const { data, error } = await supabase
      .from('tb_his_vacina')
      .insert([hisVacina])
      .select()

    if (error) return reply.code(500).send({ success: false, error: error.message })

    return { 
      success: true, 
      data: data[0].id_his_vacina, 
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
