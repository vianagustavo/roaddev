Para adicionar/alterar migrations no model execute:
`yarn typeorm -- migration:generate ./src/migrations/create-user`
e
`yarn typeorm -- migration:run`

Inicializando o projeto:

- Rodar `yarn --frozen-lockfile`
- Setar as variáveis de ambiente no .env conforme necessário
- Rodar `yarn dev` para inicializar a API


