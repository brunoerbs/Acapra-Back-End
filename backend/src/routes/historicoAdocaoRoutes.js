import { listarHistoricoAdocao, listarHistoricoAdocaoPorPet, criarHistoricoAdocao, atualizarHistoricoAdocao } from './historicoAdocao.js'

export default async function historicoAdocaoRoutes(app) {
  app.get('/listarHistoricoAdocao', listarHistoricoAdocao)      
  app.get('/listarHistoricoAdocaoPorPet', listarHistoricoAdocaoPorPet)
  app.post('/criarHistoricoAdocao', criarHistoricoAdocao)         
  app.put('/atualizarHistoricoAdocao', atualizarHistoricoAdocao) 
}
