import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function testar() {
  const { data, error } = await supabase.from('tb_pet').select('*').limit(1)
  if (error) {
    console.error('Erro Supabase:', error.message)
  } else {
    console.log('Deu certo! Dados:', data)
  }
}

testar()
