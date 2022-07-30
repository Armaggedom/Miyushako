# Miyushako
## um jogo RPG sendo desenvolvido
---
### Acesse o site por aqui: https://miyudata.herokuapp.com/register.html
## Content:
* [Status](#Status)
* [log](#log)
* conteudos na área de desenvolvedor --
  * [contato](#contato)
  * [dependencias](#dependencias)
  * [ATENÇÃO](#ATENÇÃO)
  * [instalação-e-configuração](#instalação-e-configuração)
## Status:
<img src="https://img.shields.io/static/v1?label=Status&message=OFFLINE&color=red&style=plastic" />

![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/Armaggedom/miyuDevelopment?color=purple&filename=package.json&style=plastic)

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Armaggedom/miyuDevelopment?style=plastic)
## log:
(obs: o log está sendo datado com precisão após a versão 0.2.2build1)
```sh
- V:0.0.1
    - criação do projeto
    - criação e finalização da página de registro
- V:0.1.0
    - criação da página de login
- V:0.2.0
    - atualização e finalização da página de login
- V:0.2.1
    - correção de bugs
- V:0.2.2
    - pequenas atualizações e correções
- V:0.2.2Build1:
    - protótipo da página do jogo
```
---
# Area do desenvolvedor
## contato
> ![Discord](https://img.shields.io/discord/997590312300072971?style=plastic)
> [Discord Group](https://discord.gg/Pv3AuTbfyb) - DevMaster: `Miyu`
---
## dependencias

#### dependencia Macro
> `nodejs ^16.15`
> `npm ^8.5.5`

#### dependencias do projeto
> instalando: baixe os arquivos do git, e dentro do diretório do arquivo `index.js` utilize o comando `npm i` ele instalará as seguintes dependencias:

|nome|versão|categoria|
|-|-|-|
|express|^4.17.3|dependencies|
|mysql2|^2.3.3|dependencies|
|sequelize|^6.21.3|dependencies|
|socket.io|^4.5.1|dependencies|
|dotenv|^16.0.1|devDependencies|
|nodemon|^2.0.19|devDependencies|

## ATENÇÃO:
### MySQL: 
> está em .env, logo, não será executada a conexão. Para fins de testes comente a aba `SCRIPT` do html em edição ou socilice um html desconfigurado

### INDEX.JS
> de preferencia não o execute. Devido ao mesmo motivo acima, `MySQL`, não está configurado para outros ambientes isso fará com que retorne o erro de dataBase inválida. Caso deseje, vá para a área de instalação e configuração

## instalação e configuração
Acesse o [site](https://www.mysql.com/) e vá para a aba de MySQL Community Server ou clique [aqui](https://dev.mysql.com/downloads/mysql/). Clique em go to download page e baixe a versão mais recente
> Windows (x86, 32-bit), MSI Installer  8.0.30  5.5M
e instale, caso aja dúvidas entre em contato atráves do link que está em contato
---
Configuração: após ter criado seu servidor pelo Mysql crie um .env na raiz do projeto e siga esta configuração
```
DB_NAME="<nome da database>"
DB_USER="<nome do usuário>"
DB_PASSWORD="<senha da database>"
DB_HOST="<host>"
```
concluindo esses passos será possível você testar todas as funções da API
