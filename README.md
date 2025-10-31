# 📌 API Acapra - Documentação

API desenvolvida em **Node.js + Fastify** para gerenciar informações de pets, usuários, visitas, adoções, vacinas e doenças.

---

## 🚀 Como rodar o projeto

```bash
# Instalar dependências
npm install

# Rodar servidor em desenvolvimento
npm run dev

# Servidor padrão roda em:
http://localhost:3001
```

---

## 📂 Endpoints

### 🔹 Usuários (`/usuario`)
- **GET** `/usuario` → Listar usuários  
- **GET** `/usuario/:id` → Retornar usuário por ID  
- **GET** `/usuario/login` → Login (headers: `email`, `senha`)  
- **POST** `/usuario` → Criar usuário  
- **PUT** `/usuario/:id` → Inativar usuário  
- **PUT** `/usuario` → Editar usuário  

---

### 🔹 Pets (`/pet`)
- **GET** `/pet` → Listar pets  
- **GET** `/pet/retornarPet/:id` → Retornar pet específico  
- **POST** `/pet` → Criar pet  
- **PUT** `/pet/:id` → Inativar pet  
- **PUT** `/pet` → Editar pet  

---

### 🔹 Visitas (`/visita`)
- **GET** `/visita` → Listar visitas  
- **GET** `/visita/:id` → Retornar visita específica  
- **POST** `/visita` → Agendar visita  
- **PUT** `/visita/:id` → Cancelar visita  
- **PUT** `/visita` → Editar visita  

---

### 🔹 Adoção (`/adocao`)
- **GET** `/adocao` → Listar adoções  
- **GET** `/adocao/retornarAdocao/:id` → Retornar adoção específica  
- **GET** `/adocao/listarAdocoesPorUsuario/:idUsuario` → Listar adoções de um usuário  
- **POST** `/adocao` → Criar adoção  
- **PUT** `/adocao/:id` → Inativar adoção  
- **PUT** `/adocao/atualizarAdocao` → Editar adoção  

---

### 🔹 Fotos (`/foto`)
- **GET** `/foto` → Listar fotos  
- **GET** `/foto/:id` → Retornar foto específica  
- **GET** `/foto/retornarFotosPorPet/:idPet` → Listar fotos de um pet  
- **POST** `/foto` → Criar foto  
- **PUT** `/foto` → Editar foto  
- **DELETE** `/foto/:id` → Deletar foto  

---

### 🔹 Vacinas (`/vacina`)
- **GET** `/vacina` → Listar vacinas  
- **GET** `/vacina/:id` → Retornar vacina específica  
- **POST** `/vacina` → Criar vacina  
- **PUT** `/vacinas/atualizarVacina?id_vacina={id}` → Editar vacina  
- **PUT** `/vacinas/inativarVacina?id_vacina={id}` → Inativar vacina  

---

### 🔹 Doenças (`/doenca`)
- **GET** `/doenca` → Listar doenças  
- **GET** `/doenca/:id` → Retornar doença específica  
- **POST** `/doenca` → Criar doença  
- **PUT** `/doenca/:id` → Inativar doença  
- **PUT** `/doenca` → Atualizar doença  

---

### 🔹 Raças (`/raca`)
- **GET** `/raca` → Listar raças  
- **POST** `/raca` → Criar raça  
- **PUT** `/raca/:id` → Inativar raça  
- **PUT** `/raca` → Atualizar raça  

---

### 🔹 Histórico de Vacinas (`/historicoVacina`)
- **GET** `/historicoVacina/listarHistoricoVacina` → Listar histórico de vacinas  
- **POST** `/historicoVacina/criarHistoricoVacina` → Criar histórico de vacina  
- **PUT** `/historicoVacina/atualizarHistoricoVacina` → Atualizar histórico de vacina  

---

### 🔹 Histórico de Doenças (`/historicoDoenca`)
- **GET** `/historicoDoenca/listarHistoricoDoenca` → Listar histórico de doenças  
- **POST** `/historicoDoenca/criarHistoricoDoenca` → Criar histórico de doença  
- **PUT** `/historicoDoenca/atualizarHistoricoDoenca` → Atualizar histórico de doença  

---

### 🔹 Histórico de Adoções (`/historicoAdocao`)
- **GET** `/historicoAdocao/listarHistoricoAdocao` → Listar histórico de adoções  
- **POST** `/historicoAdocao/criarHistoricoAdocao` → Criar histórico de adoção  
- **PUT** `/historicoAdocao/atualizarHistoricoAdocao` → Atualizar histórico de adoção  

---

## 📌 Observações
- Todas as rotas retornam **JSON**.
- Para fins de testes, foi anexado no repositório um arquivo postman com todas as rotas já prontas para teste.
- Alguns endpoints ainda não têm exemplos de respostas configurados no Postman.
- A API se comunica com um banco na nuvem alocado no supabase. Para ter acesso, precisaremos adicionar seu email como perfil de administrador manualmente na plataforma.
- Todos os usuários atuais da base possuem a senha 1234 
