import { supabase } from '../lib/supabaseClient.js'

// GET
export async function listarPets(req, reply) {
  try {
    const q = req.query || {}
    const normalize = (s) => (s ?? '')
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
    const lc = {}
    for (const [k, v] of Object.entries(q)) lc[normalize(k)] = typeof v === 'string' ? v.trim() : v

    const especie = lc['especie']
    const porte = lc['porte']
    const genero = lc['genero']
    const raca = lc['raca']
    const status = lc['status']
    const idade = lc['idade']
    const nome = lc['nome'] ?? lc['nomepet'] ?? lc['nome_pet']

    let query = supabase
      .from('tb_pet')
      .select('*')

    if (especie !== undefined && especie !== '') {
      const val = Number(especie)
      query = query.eq('tb_especie', Number.isNaN(val) ? String(especie).trim() : val)
    }
    if (porte !== undefined && porte !== '') {
      const val = Number(porte)
      query = query.eq('tb_pet_porte', Number.isNaN(val) ? String(porte).trim() : val)
    }
    if (genero !== undefined && genero !== '') {
      const val = Number(genero)
      query = query.eq('tb_pet_genero', Number.isNaN(val) ? String(genero).trim() : val)
    }
    if (raca !== undefined && raca !== '') {
      const val = Number(raca)
      query = query.eq('id_raca', Number.isNaN(val) ? String(raca).trim() : val)
    }
    if (status !== undefined && status !== '') {
      const val = Number(status)
      query = query.eq('tb_pet_status_pet', Number.isNaN(val) ? String(status).trim() : val)
    }
    if (nome !== undefined && nome !== '') {
      // Busca por nome parcial (case-insensitive)
      query = query.ilike('tb_pet_nome', `%${nome}%`)
    }
    if (idade !== undefined && idade !== '') {
      const idadeNum = Number(idade)
      if (!Number.isNaN(idadeNum) && idadeNum >= 0) {
        const now = new Date()
        const upper = new Date(now)
        upper.setFullYear(now.getFullYear() - idadeNum)
        const lower = new Date(now)
        lower.setFullYear(now.getFullYear() - (idadeNum + 1))
        const toISO = (d) => d.toISOString().slice(0, 10)
        query = query.lte('tb_pet_data_nascimento', toISO(upper)).gt('tb_pet_data_nascimento', toISO(lower))
      }
    }

    const { data, error } = await query

    if (error) return reply.code(500).send({ success: false, error: error.message })

    const idsRaca = Array.from(new Set((data || [])
      .map((p) => p?.id_raca)
      .filter((v) => v !== null && v !== undefined)))

    if (idsRaca.length > 0) {
      const { data: racas, error: racaError } = await supabase
        .from('tb_raca')
        .select('id_raca, tb_raca_nome_raca')
        .in('id_raca', idsRaca)

      if (racaError) return reply.code(500).send({ success: false, error: racaError.message })

      const racaMap = new Map((racas || []).map((r) => [r.id_raca, r.tb_raca_nome_raca]))
      const dataComRaca = (data || []).map((p) => ({
        ...p,
        tb_raca_nome_raca: racaMap.get(p.id_raca) ?? null,
      }))

      return { data: dataComRaca }
    }

    return { data }
  } catch (err) {
    return reply.code(500).send({ success: false, error: err?.message || 'Erro ao listar pets' })
  }
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
  const { tb_foto_pet_url_foto, anexo, foto, ...restoPet } = req.body ?? {}

  const pet = {
    ...restoPet,
    tb_pet_inativo: false,
    tb_pet_status_pet: 1,
    tb_pet_adotado: false
  }
  const { data, error } = await supabase
    .from('tb_pet')
    .insert([pet]).select();

  if (error) return reply.code(500).send({ success: false, error: error.message })

  const novoIdPet = data?.[0]?.id_pet

  // Se veio algum anexo, salva na tabela de fotos vinculando ao pet criado
  const anexoValor = tb_foto_pet_url_foto ?? foto ?? anexo
  if (novoIdPet && anexoValor) {
    const fotoRegistro = {
      tb_foto_pet_url_foto: anexoValor,
      id_pet: novoIdPet
    }

    const { error: fotoError } = await supabase
      .from('tb_foto_pet')
      .insert([fotoRegistro]).select()

    if (fotoError) {
      return reply.code(500).send({
        success: false,
        error: `Falha ao salvar a foto do pet: ${fotoError.message}`,
      })
    }
  }

  return { success: true, 
    data: novoIdPet, 
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
  const body = req.body ?? {}

  if (!body.id_pet) {
    return reply.code(400).send({ error: "O campo 'id_pet' é obrigatório." });
  }

  const { tb_foto_pet_url_foto, anexo, foto, id_pet, ...dadosParaAtualizar } = body;

  const { data, error } = await supabase
    .from('tb_pet')
    .update(dadosParaAtualizar)
    .eq('id_pet', id_pet)
    .select();

  if (error) return reply.code(500).send({ success: false, error: error.message });

  const anexoValor = tb_foto_pet_url_foto ?? foto ?? anexo
  if (anexoValor) {
    const fotoRegistro = {
      tb_foto_pet_url_foto: anexoValor,
      id_pet
    }

    const { error: fotoError } = await supabase
      .from('tb_foto_pet')
      .insert([fotoRegistro]).select()

    if (fotoError) {
      return reply.code(500).send({
        success: false,
        error: `Pet atualizado, mas falha ao salvar a foto: ${fotoError.message}`,
      })
    }
  }

  return { success: true, 
    data: data?.[0], 
    message: `Pet ${id_pet} atualizado.` };
}

