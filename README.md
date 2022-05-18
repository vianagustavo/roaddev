# RoadDev

API feita para gerenciar redes de escolas, gerando o fluxo de inserção de estudantes e professores, autenticação dos mesmos, atualização de dados além da montagem do cronograma das aulas.
A API também faz uma integração com a API prismaone, para validar os status de matrículas de cada estudante.

# Sumário
1. <a href="#Hosted APP">Hosted APP</a>
2. <a href="#Documentação da RoadDev">Documentação da RoadDev</a>
3. <a href="#Tecnologias utilizadas">Tecnologias Utilizadas</a>
4. <a href="#Inicializando">Inicializando</a>
5. <a href="#Configurando o Projeto">Configurando o Projeto</a>
6. <a href="#Gerando e Rodando Migrations (TypeORM)">Gerando e Rodando Migrations (TypeORM)</a>
7. <a href="#Rodando Testes">Rodando Testes</a>
8. <a href="#Deploy">Deploy</a>
9. <a href="#API Endpoints">API Endpoints</a>
10. <a href="#Autor">Autor</a>

## Hosted APP

https://roaddev-1.herokuapp.com/

## Documentação da RoadDev

https://roaddev-1.herokuapp.com/api-docs/

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

## Configurando o Projeto

Setar variáveis de ambiente de acordo

|     Variável    |      Default     |          Notes           |
| --------------- | ---------------- | ------------------------ |
|  `DB_DATABASE`  | `roaddev-tests`  |       Nome do Banco      |
|    `DB_HOST`    |    `localhost`   |       Host do Banco      |
|  `DB_USERNAME`  |      `root`      |     Username do Banco    |
|  `DB_PASSWORD`  |      `admin`     |      Senha do Banco      |
|     `PORT`      |      `4800`      |  Porta de inicialização  |
|  `ENVIRONMENT`  |      `local`     |   Variável de Ambiente   |
|  `USER_SECRET`  |                  |  Secret - Token Usuário  |
| `STUDENT_SECRET`|                  | Secret - Token Estudantes|


## Gerando e Rodando Migrations (TypeORM)

Para adicionar/alterar migrations no model execute:

```
# Gerando Migrations
$ yarn typeorm -- migration:generate ./src/migrations/create-user
# Rodando Migrations
$ yarn typeorm -- migration:run

```

## Rodando Testes

Os testes de integração estão disponíveis para essa aplicação, e o script utilizado para o rodar o Jest pode ser encontrado no `package.json`.

```
# Rodando os testes
$ yarn test

```

## Deploy

Ao longo do desenvolvimento do projeto, foi selecionada a plataforma do Heroku para subirmos a aplicação de forma simplificada e acessível em nuvem. Para tal basta preencher com suas credenciais do Heroku, buildar e inicializar o projeto:

```

$ yarn build

$ yarn start

```

## API Endpoints

|  Verbo   |                    Endpoint                     |                 Descrição                  |     Acessível à:      |
| :------- | :---------------------------------------------: | :----------------------------------------: | :-------------------: |
| `POST`   |                  `/users`              |              Criação de novo usuário                |       Diretoria       |
| `PUT`    |                  `/users`              |           Alteração de senha de usuário             |       Diretoria       |
| `POST`   |                `/login/admin`          |             Autenticação de usuários                |       Diretoria       |
| `POST`   |                 `/networks`            |                Criação de Rede                      |       Diretoria       |
| `POST`   |                 `/schools`             |                Criação de Escola                    |       Diretoria       |
| `GET`    |                 `/schools`             |               Listagem de Escolas                   |       Diretoria       |
| `POST`   |                 `/students`            |                Criação de Estudante                 |       Diretoria       |
| `POST`   |                `/login/student`        |               Autenticação de estudante             |       Estudantes      |
| `GET`    |                 `/students`            |                Listagem de Estudantes               |       Diretoria       |
| `PUT`    |                 `/students`            |            Alteração de senha de estudante          |       Estudantes      |
| `POST`   |                 `/classes`             |                Criação de nova aula                 |       Diretoria       |
| `POST`   |                 `/teachers`            |                Criação de novo professor            |       Diretoria       |
| `POST`   |                `/student-class`        |              Adição de relação aluno-aulas          |       Estudantes      |
| `GET`    |                `/student-class`        |           Listagem das relações aluno-aulas         |       Estudantes      |
| `POST`   |                `/school-teacher`       |          Adição de relação escola-professor         |       Diretoria       |
| `GET`    |                `/school-teacher`       |         Listagem das relações escola-professor      |       Diretoria       |
| `POST`   |                `/teacher-class`        |          Adição de relação professor-aulas          |       Diretoria       |
| `GET`    |                `/teacher-class`        |         Listagem das relações professor-aulas       |       Diretoria       |

## Autor

- **Gustavo Ferreira Viana**