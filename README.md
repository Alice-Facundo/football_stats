# Football Stats

Um aplicativo web para visualizar estatísticas de jogos de futebol por temporada.

## Visão Geral

Este projeto consiste em um aplicativo web que permite aos usuários visualizar estatísticas de jogos de futebol. O frontend é construído com React e o backend com Node.js e Express, com um banco de dados MySQL para armazenar os dados.

## Funcionalidades

  * **Seleção de Temporada**: Os usuários podem selecionar uma temporada de futebol (de 2010 a 2023) para visualizar os jogos correspondentes.
  * **Visualização de Jogos**: Para cada temporada, o aplicativo exibe uma lista de jogos, incluindo as equipes da casa e visitante, data, estádio, placar e árbitro.
  * **Detalhes da Partida**: Os usuários podem expandir cada jogo para ver detalhes adicionais, como eventos da partida (por exemplo, gols, cartões) e a lista de jogadores de cada time.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

  * **`frontend`**: Contém o aplicativo React.
  * **`backend`**: Contém o servidor Node.js e Express e a configuração do banco de dados.

## Tecnologias Utilizadas

### Frontend

  * **React**: Biblioteca JavaScript para construir interfaces de usuário.
  * **Axios**: Cliente HTTP baseado em promessas para fazer requisições ao backend.
  * **React-Select**: Componente de seletor para React.

### Backend

  * **Node.js**: Ambiente de execução JavaScript do lado do servidor.
  * **Express**: Framework web para Node.js, usado para criar a API.
  * **MySQL2**: Cliente MySQL para Node.js, para interagir com o banco de dados.
  * **Cors**: Middleware para habilitar o Cross-Origin Resource Sharing.
  * **Dotenv**: Módulo para carregar variáveis de ambiente de um arquivo `.env`.

## Como Executar o Projeto

### Pré-requisitos

  * Node.js e npm instalados.
  * Um servidor de banco de dados MySQL em execução.

### Backend

1.  **Navegue até a pasta `backend`**:
    ```bash
    cd backend
    ```
2.  **Instale as dependências**:
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente**: Crie um arquivo `.env` na pasta `backend` e adicione as seguintes variáveis:
    ```
    DB_HOST=seu_host_de_banco_de_dados
    DB_USER=seu_usuario_de_banco_de_dados
    DB_PASSWORD=sua_senha_de_banco_de_dados
    DB_NAME=seu_nome_de_banco_de_dados
    ```
4.  **Inicie o servidor**:
    ```bash
    node index.js
    ```
    O servidor estará em execução em `http://localhost:5000`.

### Frontend

1.  **Navegue até a pasta raiz do projeto**.
2.  **Instale as dependências**:
    ```bash
    npm install
    ```
3.  **Inicie o aplicativo React**:
    ```bash
    npm start
    ```
    O aplicativo estará disponível em `http://localhost:3000`.