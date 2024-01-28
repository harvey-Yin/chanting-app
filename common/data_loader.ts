import { ChantRecord, User, UIChantCard } from "./model.js"

class DataLoader {

	ranking_map : Map<Date, ChantRecord[]> = new Map();
	users : User[] = [];

	load() {
		let user1 = new User("user123", []);
		let user2 = new User("userabc", []);
		let user3 = new User("userxyz", []);
		this.users.push(user1, user2, user3);

		let date1 = new Date(2024, 0, 28);
		user1.addChantRecords([new ChantRecord(user1, date1, 2000)]);
		user2.addChantRecords([new ChantRecord(user2, date1, 1500)]);
		user3.addChantRecords([new ChantRecord(user3, date1, 1000)]);

		date1 = new Date(2024, 0, 29);
		user1.addChantRecords([new ChantRecord(user1, date1, 1200)]);
		user2.addChantRecords([new ChantRecord(user2, date1, 700)]);
		user3.addChantRecords([new ChantRecord(user3, date1, 900)]);

		date1 = new Date(2024, 0, 30);
		user1.addChantRecords([new ChantRecord(user1, date1, 1300)]);
		user2.addChantRecords([new ChantRecord(user2, date1, 1900)]);
		user3.addChantRecords([new ChantRecord(user3, date1, 1800)]);
	}

	get_rank_list(date : Date) : ChantRecord[] {
		let date_chant_stat = this.ranking_map.get(date);
		if (!date_chant_stat) {
			date_chant_stat = this.users.flatMap(user => user.chant_stat)
				.filter(record => record.chant_date == date)
				.sort((a, b) => a.chant_count - b.chant_count);

			this.ranking_map.set(date, date_chant_stat);

			// for(var i = 0; i < users.length; i ++){
			// 	for (var j = 0; j < users[i].ChantRecord.length; j ++){
			// 		chantRecord = users[i].ChantRecord[j];
			// 		if(users[i].date == date){
			// 			date_chant_stat.push(chantRecord);
			// 		}
			// 	}
			// }

			// date_chant_stat.sort();
			// console.log(date_chant_stat);
		}
		return date_chant_stat;
	}

	create_chant_card_by_user(userId : String): UIChantCard[]{
		let cards_list:UIChantCard[] = [];
		let user = this.users.find(u => u.user_id == userId);
		if (user) {
			cards_list = user.chant_stat.map(item => {
				let date_rank_list = this.get_rank_list(item.chant_date);
				let rank = date_rank_list.indexOf(item) + 1;
				return new UIChantCard(item, rank, date_rank_list[0].user);
			}).sort((card1, card2) => (card1.chant_date.getTime() - card2.chant_date.getTime()));
		}
		return cards_list;
		// for(var i = 0; i < user.chant_stat.length; i++){
		// 	user_record = user.chant_stat[i];
		// 	date_rank_list = get_rank_list(user_record.chant_date);
		// 	cards_list.push(new UIChantCard(user_record,date_rank_list.indexOf(user_record)+1,date_rank_list[0]));
		// }
	}

}
// get_rank_list(new Date(2024,0,30));

export { DataLoader };