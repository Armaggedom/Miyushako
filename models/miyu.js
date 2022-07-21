//require('../dotenv/config');	
const Sequelize=require('sequelize')
//just development
const sequelize= new Sequelize('miyu', 'root', 'miyudatabase', {host: 'localhost', dialect: 'mysql'})
//just online
//const sequelize= new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {host: process.env.DB_HOST, dialect: 'mysql'})
sequelize.authenticate().then(function(){console.log('conectado')}).catch(function(erro){console.log('nao conectado: '+erro)})
sequelize.sync({alter: true})
module.exports=sequelize;