# RoadDev

API feita para gerenciar redes de escolas, gerando o fluxo de inserção de estudantes e professores, autenticação dos mesmos, atualização de dados além da montagem do cronograma das aulas.
A API também faz uma integração com a API prismaone, para validar os status de matrículas de cada estudante.

# Sumário
1. <a href="#Tecnologias utilizadas">Tecnologias Utilizadas</a>
2. <a href="#Inicializando">Inicializando</a>

## Tecnologias Utilizadas

- [NodeJS](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [Postgres](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [Supertest]()
- [Axios](https://axios-http.com/ptbr/)
- [Node-cache]()


## Inicializando

- Clonar o repositório: `git clone https://github.com/vianagustavo/roaddev.git`
- Rodar `yarn --frozen-lockfile`
- Setar as variáveis de ambiente no .env (conforme próximo passo)
- Rodar `yarn dev` para inicializar a API

## Configurando o Projeto

Setar variáveis de ambiente de acordo

| Variable | Default | Notes                          |
| --------------- | ---------------- | ------------------------------ |
|  `DB_DATABASE`  | `roaddev-tests`  | Nome do Banco |
|    `DB_HOST`    |    `localhost`   | Host do Banco |
| `PORT`   | `5432`  | The port the server listens on |
| `PORT`   | `5432`  | The port the server listens on |
| `PORT`   | `5432`  | The port the server listens on |
| `PORT`   | `5432`  | The port the server listens on |
| `PORT`   | `5432`  | The port the server listens on |

## Gerando e Rodando Migrations (TypeORM)

Para adicionar/alterar migrations no model execute:
`yarn typeorm -- migration:generate ./src/migrations/create-user`
e
`yarn typeorm -- migration:run`





