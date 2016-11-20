'use strict';
class SocialChoice{
	constructor(_objective="présider la France",_subjectType="candidats"){
		this.header = `Pour ${_objective}, ayant pris tous les éléments en considération, je juge en conscience que ces ${_subjectType} seraient:`;
		this.options = [];
		// mentions/distinctions
		this.mentions = ["Excellent", "Très bien", "Bien", "Assez bien", "Passable", "Insuffisant", "A rejeter"];
		this.votes = [[]];
		this.winners = [];
		this.trigger = .5;

	}
	setOptions(_option=[]){
		this.options = _option;
	}
	setVotes(_votes=[[]]){
		this.votes = _votes;
	}
	resolveWithMajorityJudgmentMethod(){
		// init resolution matrix
		//
		// vs 		mentions
		// options
		let result = Array.apply(null, Array(this.options.length)).map( (x, i)=>{ return new Array(this.mentions.length).fill(0); });
		//console.table(result);

		// count votes
		for(let i=0 ; i < this.votes.length ; i++){
			for(let j=0 ; j < this.votes[i].length ; j++){
				result[j][this.votes[i][j]]++;
			}
		}
		let count = result;
		//console.table(result);

		// compute votes percentage
		result = result.map(x=>x.map(y=>y/this.votes.length));
		//console.table(result);

		// compute votes cumulated percentage
		result = result.map(x=>{
			let _cumulatedPercentage = 0;
			return x.map(y=>{
				return _cumulatedPercentage += y;
			});
		});

		// find the winner
		for(let i=0 ; i < this.mentions.length ; i++){
			let _isFound = false;
			for(let j=0 ; j < this.options.length ; j++){
				if( result[j][i] >= this.trigger ){
					this.winners.push([j,i,result[j][i]]);
					_isFound = true;
				}
			}
			if(_isFound){break;}
		}
		//console.table(result);
		//console.table(this.winners);
		return count;
	}
	getResult(_formated=false){
		return !_formated?this.winners:this.winners.map(x=>
			[this.options[x[0]],this.mentions[x[1]],(x[2]*100).toFixed(2)]
		);
	}
}