import { listarHistoricoDoenca, listarHistoricoDoencaPorPet, criarHistoricoDoenca, atualizarHistoricoDoenca } from './historicoDoenca.js'

export default async function historicoDoencaRoutes(app) {
  app.get('/listarHistoricoDoenca', listarHistoricoDoenca)      
  app.get('/listarHistoricoDoencaPorPet', listarHistoricoDoencaPorPet)
  app.post('/criarHistoricoDoenca', criarHistoricoDoenca)         
  app.put('/atualizarHistoricoDoenca', atualizarHistoricoDoenca) 
}
