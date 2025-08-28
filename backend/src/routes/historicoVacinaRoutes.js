import { listarHistoricoVacina, criarHistoricoVacina, atualizarHistoricoVacina } from './historicoVacina.js'

export default async function hisVacinaRoutes(app) {
  app.get('/listarHistoricoVacina', listarHistoricoVacina)         
  app.post('/criarHistoricoVacina', criarHistoricoVacina)          
  app.put('/atualizarHistoricoVacina', atualizarHistoricoVacina)   
}
