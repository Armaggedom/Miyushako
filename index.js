/*
* laucher
* Developer
	- Bombbom
 -------------------
* Credits
* thanks Kashi for making our login screen design 
*/
const miyu=require('./models/miyu.js')
const Profile=require('./models/profile.js')
const express=require('express')
const { Server } = require('socket.io')
const { createServer } = require('http')
const path = require('path')
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {})
//------
app.use('/', express.static(path.join(__dirname, 'public')))
//------
io.on("connection", socket => {
	//serverBox
	socket.join('room1')
	//idCustom
	socket.on('storeClientInfo', (data)=>{socket.customId=data.customId})
	socket.on('disconnect', ()=>{})
	//recive docs args
	socket.on("docs", (args)=>{
		const mysplit=args.toString()
		const array=mysplit.split(',')	
		//create profile
		const newPlayer=Profile.create({
			gender: array[0],
		 	affinity: array[1],
			bodytype: array[2],
		 	name: array[3],
		 	password: array[4],
		 	money: 0
		}).then(function(){
			socket.emit('reciveMessageRegister', 'granted') //error???
		}).catch(function(error){
			socket.emit('reciveMessageRegister', 'dennied') //error???
		})
	})
	//recive loginRequest args
	socket.on('loginRequest', (args)=>{
		const mysplit=args.toString()
		const array=mysplit.split(',') // [0]=username, [1]=password
		validationLogin(socket, array)
	})
	//requestData
	// info: requests system=pos[0]=Requester, pos[1]=type and pos[2, 3, ...]= value
	socket.on('requestData', (args)=>{
		const mysplit=args.toString()
		const array=mysplit.split(',')
		requestReply(array[0], array[1], socket)})
})
//----------------------- LOGIN
async function validationLogin(socket, array) {
	const user=await Profile.findByPk(array[0])
	if(array[1]==user.password) {socket.emit('loginReply', 'granted')}
	else {socket.emit('loginReply', 'dennied')}
}
httpServer.listen(process.env.PORT || 5000, ()=>{ 
	console.clear()
	console.log('[Cardial Info] : Server Started')
})
//----------------------- REQUESTS
async function requestReply(name, request, socket) {
	const user=await Profile.findByPk(name)
	if(request=='Info') {socket.emit('reciveData', 'Info'+','+user.class+','+user.money)}
	else {/*error*/}
}
async function editMiyu() {
	console.clear()
	const pessoa=await Profile.findByPk(/*primarykey*/)
	//pessoa.money=300 need automatization
	await pessoa.save().then(function(){console.log('perfil editado')}).catch(function(error){console.log('occoreu um erro: '+error)})
}
async function deleteMiyu() {
	console.clear()
	const pessoa=await Profile.findByPk(/*primarykey*/)
	pessoa.destroy()
	await pessoa.save().then(function(){console.log('perfil deletado')}).catch(function(error){console.log('occoreu um erro: '+error)})
}