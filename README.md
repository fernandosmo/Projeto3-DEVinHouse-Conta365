# Projeto3-DEVinHouse-Conta365

Api desenvolvida para controle de finanças - Projeto 3 do curso DevinHouse - NodeJs


## Instruções

Essas instruções permitirão que você faça uma cópia do projeto em operação.


### 🔧 Instalação

Para utilizar essa API, antes de mais nada, é preciso a instalação do package.json com o comando:
```
npm install
```
Para executar utilize o comando:

```
npm start

```
## Acessando a API

Existem dois caminhos para acessar a API e testá-la:

http://localhost:3333/


https://safe-headland-78066.herokuapp.com/


## Acessando a documentação da API

Para acessar a documentação acesse um dos links:

http://localhost:3333/docs/


https://safe-headland-78066.herokuapp.com/docs/


## Funcionamento

A API é composta por endpoints que te permitem fazer as seguintes ações (caminho usado para explicação http://localhost:3333/):


## User
### GET
```
http://localhost:3333/users
```
Retorna a lista e todos os usuários.

### GET

```
http://localhost:3333/user/:id
```
Retorna as informações de um usuário específico.

### POST

```
http://localhost:3333/newuser
```
Endpoint para criar um novo usuário.

### PATCH

```
http://localhost:3333/user/:id
```
Endpoint para atualizar as informações de um usuário específico.

## Finance
### POST
```
http://localhost:3333//finance/:userid
```
Endpoint para fazer upload de um arquivo xlsx com as finanças de um usuário e salvá-las.

### DELETE
```
http://localhost:3333//:userid/:financeid
```
Endpoint para excluir uma finança específico de um um usuário.


## 🛠️ Construído com

* [Node.Js](https://nodejs.org/en/) 
* [Express](https://expressjs.com/pt-br/) 
* [Multer](https://www.npmjs.com/package/multer)
* [nodemon](https://www.npmjs.com/package/nodemon) 
* [xlsx-populate](https://www.npmjs.com/package/xlsx-populate) 
* [swagger](https://swagger.io/) 
* [swagger-autogen](https://www.npmjs.com/package/swagger-autogen)
* [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)


## Autor
**Fernando Silva** 
*[Github](https://github.com/fernandosmo)
*[Linkedin](https://www.linkedin.com/in/fernandosmo)


## 📄 Licença

Este projeto está sob a licença MIT.
