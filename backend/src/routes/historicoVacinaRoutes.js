import { listarHistoricoVacina, listarHistoricoVacinaPorPet, criarHistoricoVacina, atualizarHistoricoVacina } from './historicoVacina.js'

export default async function hisVacinaRoutes(app) {
  app.get('/listarHistoricoVacina', listarHistoricoVacina)         
  app.get('/listarHistoricoVacinaPorPet', listarHistoricoVacinaPorPet)         
  app.post('/criarHistoricoVacina', criarHistoricoVacina)          
  app.put('/atualizarHistoricoVacina', atualizarHistoricoVacina)   
}
