class ChantRecord {
	constructor(
		public user : User,
		public chant_date : Date,
		public chant_count : number) {
	}
}

class User {
	constructor(
		public user_id : string,
		public chant_stat : ChantRecord[] = []) {
	}
	
	addChantRecords(records: ChantRecord[]){
		records.forEach(r => r.user = this);
		this.chant_stat.push(...records);
	}
}

class UIChantCard {
	chant_date : Date;
	chant_count : number;
	rank : number;
	top_user : User;
	constructor(
		chant_record : ChantRecord,
		rank : number,
		top_user : User) {
		this.chant_date = chant_record.chant_date;
		this.chant_count = chant_record.chant_count;
		this.rank = rank;
		this.top_user = top_user;
	}
}

export { ChantRecord, User, UIChantCard };