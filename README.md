# Projeto3-DEVinHouse-Conta365

Api desenvolvida para controle de finanças - Projeto 3 do curso DevinHouse - NodeJs

## Primeiros passos

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.


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


## Funcionamento

A API é composta por endpoints que te permitem fazer as seguintes ações (caminho usado para explicação http://localhost:3333/):

## User
### get
```
http://localhost:3333/users
```
Retorna a lista e todos os usuários.

### get

```
http://localhost:3333/user/:id
```
Retorna as informações de um usuário específico.

### póst

```
http://localhost:3333/newuser
```
Endpoint para criar um novo usuário.

### patch

```
http://localhost:3333/user/:id
```
Endpoint para atualizar as informações de um usuário específico.

## Finance
### post
```
http://localhost:3333//finance/:userid
```
Endpoint para fazer upload de um arquivo xlsx com as finanças de um usuário e salvá-las.

### delete
```
http://localhost:3333//:userid/:financeid
```



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
[Github](https://github.com/fernandosmo)
[Linkedin](https://www.linkedin.com/in/fernandosmo)

## 📄 Licença

Este projeto está sob a licença MIT
