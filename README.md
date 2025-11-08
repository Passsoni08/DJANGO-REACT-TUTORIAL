
# Título do Projeto

# 🌀 DJANGO-REACT-TUTORIAL

Simples aplicação para registro de notas com integração completa entre **Django (backend)** e **React (frontend)** — um exemplo de um Bloco de Notas que demonstra autenticação, API REST e consumo de dados no React.

---

## 🧩 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Python 3.10+**
- **Node.js + npm** (ou **yarn**)
- **Git**
- **PostgreSQL** (ou use SQLite para testes locais)
- *(Opcional)* **Docker**, se quiser rodar em contêiner

---

## ⚙️ Instalação e Execução

#### 1️⃣ Backend (Django)

```bash
# Acesse a pasta do backend
cd backend

# Crie e ative o ambiente virtual
python -m venv env
env\Scripts\activate  # Windows
# source env/bin/activate  # Linux/Mac

# Instale as dependências
pip install -r requirements.txt

# Crie o arquivo .env e adicione:
# DB_NAME=seu_banco
# DB_USER=seu_usuario
# DB_PASSWORD=sua_senha
# DB_HOST=localhost
# DB_PORT=5432

# Aplique as migrações
python manage.py migrate

# Execute o servidor
python manage.py runserver

-- 

## Frontend

# Acesse a pasta do frontend
cd ../frontend

# Instale dependências
npm install
# ou
# yarn install

# Configure a URL da API
# Crie um arquivo .env com:
# REACT_APP_API_URL=http://127.0.0.1:8000/api/

# Execute o projeto
npm start
# ou
# yarn start


