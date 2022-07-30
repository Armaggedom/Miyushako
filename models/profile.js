const Sequelize=require('sequelize')
const db=require('./miyu.js')
const profile=db.define('profile', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	affinity: {
		type: Sequelize.STRING,
		allowNull: false
	},
	gender: {
		type: Sequelize.STRING,
		allowNull: false
	},
	bodytype: {
		type: Sequelize.STRING,
		allowNull: false
	},
	money: Sequelize.DECIMAL
})
module.exports=profile;