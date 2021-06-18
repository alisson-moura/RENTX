<div align=center><img src=".github/logo.png"/></div>
<br/>
<h3 align=center>API em Node.js para aluguel de carros</h3>

<div align=center>
<a href="#Sobre-o-projeto">Sobre</a> |
<a href="#Tecnologias-utilizadas">Tecnologias</a> |
<a href="#Como-executar">Executando</a> |
<a href="#Licenca">Licença</a>
</div>

---

## Sobre o projeto

RentX é uma API REST desenvolvida em um bootcamp de back-end chamado [Ignite](https://pages.rocketseat.com.br/ignite). É uma plataforma de aluguel de carros que permite gerir os seus veículos, as suas características e, claro, os seus aluguéis!


## Tecnologias utilizadas

- [Typescript](https://www.typescriptlang.org/) - Superset para JavaScript
- [Nodejs](https://www.nodejs.org)
- [Multer](https://github.com/expressjs/multer) - Middleware de upload de arquivos
- [Expressjs](https://github.com/expressjs/express) - Micro framework web
- [Swagger UI](https://swagger.io/) - Design e documentção da API

## Como executar
Use o seu terminal para clonar o repositório para a sua maquina local

```bash
$ git clone https://github.com/alisson-moura/RENTX.git
$ cd RENTX
$ npm install
```
### Banco de dados
As configurações do banco de dados estão em ormconfig.json, para utilizar, um banco de dados é necessário preencher o arquivo .env de acordo com o seu ambiente

**Alguns comandos da app**
```bash
$ npm run typeorm migration:run # executa as migrations no banco de dados
$ npm run seed:admin # insere um seed no banco de dados do usuário administrador
$ npm run test # executa os testes automatizados de integração e unidade
$ npm run dev # inicia a aplicação em modo de desenvolvimento 
```

## Documentação
Os endpoints da API estão documentados com a interface do Swagger. Para acessar a documentação, basta iniciara a aplicação e acessar no seu navegador 

*http://localhost:3333/api-docs*

## Licença
Este projeto está sob a licença do MIT. Leia o arquivo [LICENSE](https://mit-license.org/) para mais informações.

---

<div align=center> 
Feito com ❤️ por <a href="https://www.linkedin.com/in/alisson-moura/">Alisson Moura</a>
<br/>
<br/>
<img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/48321754?s=460&u=9faab799c661b3f1227c25e0233a2f30b699218a&v=4" width="100px;" alt=""/>
</div>
