import { supabase } from '../lib/supabaseClient.js'

// GET
export async function listarHistoricoDoenca(req, reply) {
  try {
    const { id_historico_doenca, id_pet, id_doenca } = req.query

    let query = supabase
      .from('tb_historico_doenca')
      .select('*')

    if (id_historico_doenca) query = query.eq('id_historico_doenca', id_historico_doenca)
    if (id_pet) query = query.eq('id_pet', id_pet)
    if (id_doenca) query = query.eq('id_doenca', id_doenca)

    const { data, error } = await query
    if (error) return reply.code(500).send({ success: false, error: error.message })

    return { success: true, data }
  } catch (err) {
    return reply.code(500).send({ success: false, error: err.message })
  }
}

// GET por id_pet (query)
export async function listarHistoricoDoencaPorPet(req, reply) {
  try {
    const { id_pet } = req.query || {}

    if (!id_pet) {
      return reply.code(400).send({ success: false, error: "Parâmetro 'id_pet' é obrigatório" })
    }

    const { data, error } = await supabase
      .from('tb_historico_doenca')
      .select('*')
      .eq('id_pet', id_pet)

    if (error) return reply.code(500).send({ success: false, error: error.message })

    // Enriquecer com o nome da doença (tb_doenca_nome)
    const idsDoenca = Array.from(new Set((data || [])
      .map((h) => h?.id_doenca)
      .filter((v) => v !== null && v !== undefined)))

    if (idsDoenca.length > 0) {
      const { data: doencas, error: doencaError } = await supabase
        .from('tb_doenca')
        .select('id_doenca, tb_doenca_nome')
        .in('id_doenca', idsDoenca)

      if (doencaError) return reply.code(500).send({ success: false, error: doencaError.message })

      const doencaMap = new Map((doencas || []).map((d) => [d.id_doenca, d.tb_doenca_nome]))
      const dataComNome = (data || []).map((h) => ({
        ...h,
        tb_doenca_nome: doencaMap.get(h.id_doenca) ?? null,
      }))

      return { success: true, data: dataComNome }
    }

    return { success: true, data }
  } catch (err) {
    return reply.code(500).send({ success: false, error: err.message })
  }
}

// POST
export async function criarHistoricoDoenca(req, reply) {
  try {
    const historico = req.body

    if (!historico.id_pet || !historico.id_doenca) {
      return reply.code(400).send({ success: false, error: "Campos obrigatórios: id_pet, id_doenca" })
    }

    // data atual
    historico.tb_historico_doenca_data_diagnostico = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('tb_historico_doenca')
      .insert([historico])
      .select()

    if (error) return reply.code(500).send({ success: false, error: error.message })

    return { 
      success: true, 
      data: data[0].id_historico_doenca, 
      message: "Histórico criado com sucesso"
    }
  } catch (err) {
    return reply.code(500).send({ success: false, error: err.message })
  }
}

// PUT
export async function atualizarHistoricoDoenca(req, reply) {
  try {
    const historico = req.body

    if (!historico.id_historico_doenca) {
      return reply.code(400).send({ success: false, error: "O campo 'id_historico_doenca' é obrigatório" })
    }

    const { id_historico_doenca, tb_historico_doenca_data_diagnostico, ...dadosParaAtualizar } = historico

    // busca a data antiga caso não venha 
    const { data: existingData, error: fetchError } = await supabase
      .from('tb_historico_doenca')
      .select('tb_historico_doenca_data_diagnostico')
      .eq('id_historico_doenca', id_historico_doenca)
      .single()

    if (fetchError) return reply.code(500).send({ success: false, error: fetchError.message })

    dadosParaAtualizar.tb_historico_doenca_data_diagnostico = tb_historico_doenca_data_diagnostico || existingData.tb_historico_doenca_data_diagnostico

    const { data, error } = await supabase
      .from('tb_historico_doenca')
      .update(dadosParaAtualizar)
      .eq('id_historico_doenca', id_historico_doenca)
      .select()

    if (error) return reply.code(500).send({ success: false, error: error.message })

    return { 
      success: true, 
      data: data[0], 
      message: `Histórico ${id_historico_doenca} atualizado com sucesso`
    }
  } catch (err) {
    return reply.code(500).send({ success: false, error: err.message })
  }
}
