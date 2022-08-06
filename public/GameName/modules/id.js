const data=require('./data.json')
module.exports= function(Macro, Micro, LocalID) {
	//data jumper (obrigatory space)
	if(Macro==" Glorcimall ") {
		if(Micro==" north_gate") {return 'Glorcimall'+','+data.Glorcimall.north_gate.next[LocalID-1]}
		if(Micro==" Small_guild_post") {return 'Glorcimall'+','+data.Glorcimall.Small_guild_post.next[LocalID-1]}
		if(Micro==" small_shopping_area") {return 'Glorcimall'+','+data.Glorcimall.small_shopping_area.next[LocalID-1]}
		if(Micro==" lowLevel_medical_post") {return 'Glorcimall'+','+data.Glorcimall.lowLevel_medical_post.next[LocalID-1]}
		if(Micro==" east_gate") {return 'Glorcimall'+','+data.Glorcimall.east_gate.next[LocalID-1]}
	}
}