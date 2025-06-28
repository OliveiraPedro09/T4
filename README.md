# WB Sistema - Gerenciamento de Clientes

Sistema completo de gerenciamento de clientes com front-end React integrado ao back-end Java. O sistema permite operações completas de CRUD (Create, Read, Update, Delete) através de uma interface moderna e responsiva.

## 🚀 Tecnologias Utilizadas

### Front-end
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **MaterializeCSS** - Framework CSS para design responsivo e moderno

### Back-end
- **Java 17** - Linguagem de programação
- **Spring Boot** - Framework para desenvolvimento de aplicações Java
- **H2 Database** - Banco de dados em memória

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
- Java 17 ou superior
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passo a Passo

1. **Acesse o diretório do projeto:**
   ```bash
   cd ~/T4
   ```

2. **Execute o back-end Java (em um terminal):**
   ```bash
   cd executavel
   java -jar wbbackend.jar
   ```
   O back-end será iniciado na porta 32832.

3. **Execute o front-end React (em outro terminal):**
   ```bash
   npm install
   npm start
   ```

4. **Acesse no navegador:**
   ```
   http://localhost:3000
   ```

## 📋 Funcionalidades

- ✅ **Dashboard** - Visão geral do sistema
- ✅ **Lista de Clientes** - Visualização, busca e filtros
- ✅ **Cadastro de Clientes** - Formulário completo
- ✅ **Edição de Clientes** - Atualização de dados
- ✅ **Exclusão de Clientes** - Remoção com confirmação
- ✅ **Integração Front-end/Back-end** - API REST funcional

## 🔗 API Endpoints

- `GET /clientes` - Listar todos os clientes
- `GET /cliente/{id}` - Obter cliente específico
- `POST /cliente/cadastrar` - Cadastrar novo cliente
- `PUT /cliente/atualizar` - Atualizar cliente
- `DELETE /cliente/excluir` - Excluir cliente

