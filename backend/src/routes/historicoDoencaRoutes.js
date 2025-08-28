import { listarHistoricoDoenca, criarHistoricoDoenca, atualizarHistoricoDoenca } from './historicoDoenca.js'

export default async function historicoDoencaRoutes(app) {
  app.get('/listarHistoricoDoenca', listarHistoricoDoenca)      
  app.post('/criarHistoricoDoenca', criarHistoricoDoenca)         
  app.put('/atualizarHistoricoDoenca', atualizarHistoricoDoenca) 
}
