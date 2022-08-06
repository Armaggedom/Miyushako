/*
* laucher
* Developer
	- Bombbom
 -------------------
* Credits
* thanks Kashi for making our login screen design and helped in register optimization
*/
const MiyuGamID=require('./public/GameName/modules/id.js')
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
const initialProvinceHuman={
	"Macro":"Glorcimall",
	"Micro":"east_gate"
}
//------
io.on("connection", socket => {
	//serverBox
	socket.join('room1')
	//idCustom
	socket.on('storeClientInfo', (data)=> {socket.customId=data.customId})
	socket.on('disconnect', ()=>{})
	//recive docs args
	socket.on("docs", (args)=>{
		const mysplit=args.toString()
		const array=mysplit.split(',')	
		//create profile
		var initPos=null;
		if(array[5]=='Human') {initPos=JSON.stringify(initialProvinceHuman)}
		//else{return console.log('error')}
		const newPlayer=Profile.create({
			gender: array[0],
		 	affinity: array[1],
			bodytype: array[2],
		 	name: array[3],
		 	password: array[4],
		 	breed: array[5],
		 	locate: initPos,
		 	money: 0
		}).then(function(){return socket.emit('reciveMessageRegister', 'granted')}).catch(function(error){return socket.emit('reciveMessageRegister', 'dennied,'+error)})
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
		requestReply(array[0], array[1], socket)
	})
	// LocateJumper
	// info: locateJumper system=pos[0]=requester, pos[1]=MacroID, pos[2]=MicroID, pos[3]=LocateID
	socket.on('locateJumper', (args)=>{
		const mysplit=args.toString()
		const array=mysplit.split(',')
		editMiyu(array[0], 'locateEdit', MiyuGamID(array[1], array[2], array[3]), socket)
	}) 
})
//----------------------- LOGIN
async function validationLogin(socket, array) {
	try {
		const user=await Profile.findByPk(array[0])
		if(array[1]==user.password) {socket.emit('loginReply', 'granted')}
		else {socket.emit('loginReply', 'dennied')}
	}catch(error) {}
}
httpServer.listen(process.env.PORT || 5000, ()=>{ 
	console.log('[Cardial Info] : Server Started')
})
//----------------------- REQUESTS
async function requestReply(name, request, socket) {
	const user=await Profile.findByPk(name)
	if(request=='Info') {socket.emit('reciveData', 'Info'+','+user.affinity+','+user.money)}
	else if(request=='locate') {socket.emit('reciveData', 'locate'+','+await PushDataFromMiyu(name, 'locate'))}
	else if(request=='InfoUser') {socket.emit('reciveData', 'InfoUser'+','+await PushDataFromMiyu(name, 'InfoUser'))}
	else {/*error*/}
}
async function editMiyu(name, request, value, socket) {
	const user=await Profile.findByPk(name)
	const mysplit=value.toString()
	const array=mysplit.split(',')	
	console.log(array)
	if(request=='locateEdit') {
		const ProvinceChange={
		 	"Macro":array[0],
		 	"Micro":array[1]
		}
		user.locate=JSON.stringify(ProvinceChange)
		socket.emit('reciveData', 'RefreshData')
	}
	await user.save().then(function(){console.log('perfil editado')}).catch(function(error){console.log('occoreu um erro: '+error)})
}
async function deleteMiyu() {
	const user=await Profile.findByPk(/*primarykey*/)
	user.destroy()
	await user.save().then(function(){console.log('perfil deletado')}).catch(function(error){console.log('occoreu um erro: '+error)})
}
async function PushDataFromMiyu(name, dataToPush) {
	const user=await Profile.findByPk(name)
	var dataToReturn=null;
	if(dataToPush=='locate') {dataToReturn=user.locate}
	else if(dataToPush=='InfoUser') {dataToReturn=user.gender+','+user.affinity+','+user.bodytype+','+user.breed}
	else {}
	return dataToReturn
}
