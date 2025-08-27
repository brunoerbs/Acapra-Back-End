import { supabase } from '../lib/supabaseClient.js'
// GET
export async function listarDoencas(req, reply) {
    const { data, error } = await supabase
        .from('tb_doenca')
        .select('*')
    //.eq('tb_pet_inativo', true)
    if (error) return reply.code(500).send({ error: error.message })
    return { data }
}

export async function retornarDoenca(req, reply) {
    const { id } = req.params
    const { data, error } = await supabase
        .from('tb_doenca')
        .select('*')
        .eq('id_doenca', id)
    if (error) return reply.code(500).send({ error: error.message })
    return { data }
}
// POST
export async function criarDoenca(req, reply) {
    const doenca = req.body
    const { data, error } = await supabase
        .from('tb_doenca')
        .insert([doenca])

    if (error) return reply.code(500).send({ error: error.message })
    return { message: "Doença criada com sucesso", data }
}
// PUT
export async function inativarDoenca(req, reply) {
    const { id } = req.params

    const { data, error } = await supabase
        .from('tb_doenca')
        .update({ tb_doenca_inativo: false })
        .eq('id_doenca', id)

    if (error) return reply.code(500).send({ error: error.message })
    return { message: `Doença ${id} marcada como inativa`, data }
}
//PUT
export async function atualizarDoencaCompleto(req, reply) {
    const doenca = req.body;

    if (!doenca.id_doenca) {
        return reply.code(400).send({ error: "O campo 'id_doenca' é obrigatório" });
    }

    const { id_doenca, ...dadosParaAtualizar } = doenca;

    const { data, error } = await supabase
        .from('tb_doenca')
        .update(dadosParaAtualizar)
        .eq('id_doenca', id_doenca);

    if (error) return reply.code(500).send({ error: error.message });

    return { message: `Doença ${id_doenca} atualizada completamente`, data };
}
