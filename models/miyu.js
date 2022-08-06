require('dotenv').config()
const mysql= {
	"name":process.env.DB_NAME,
	"user":process.env.DB_USER,
	"password":process.env.DB_PASSWORD,
	"host":process.env.DB_HOST
}
const Sequelize=require('sequelize')
console.log()
const sequelize= new Sequelize(mysql.name, mysql.user, mysql.password, {host: mysql.host, dialect: 'mysql'})
sequelize.authenticate().then(function(){console.log('database connected successfully')}).catch(function(erro){console.log('database not connected, Error: '+erro)})
sequelize.sync({alter: true})
module.exports=sequelize;