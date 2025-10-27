import { listarHistoricoAdocao, criarHistoricoAdocao, atualizarHistoricoAdocao } from './historicoAdocao.js'

export default async function historicoAdocaoRoutes(app) {
  app.get('/listarHistoricoAdocao', listarHistoricoAdocao)      
  app.post('/criarHistoricoAdocao', criarHistoricoAdocao)         
  app.put('/atualizarHistoricoAdocao', atualizarHistoricoAdocao) 
}
