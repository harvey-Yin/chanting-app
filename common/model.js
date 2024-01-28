class ChantRecord{
	constructor(user, chant_date, chant_count){
		this.user = user;				//User
		this.chant_date = chant_date;  	//date
		this.chant_count = chant_count;	//int
	}
}

class User{
	constructor(user_id, chant_stat){
		this.user_id = user_id;			//int
		this.chant_stat = chant_stat;	//list of ChantRecord
	}
}

class UIChantCard{
	constructor(chant_record, rank, top_user){
		this.chant_date = chant_record.chant_date;
		this.chant_count = chant_record.chant_count;
		this.rank = rank;
		this.top_user = top_user;
	}
}

export {ChantRecord, User, UIChantCard};