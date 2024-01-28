import {ChantRecord, User, UIChantCard} from "./model.js"

class DataLoader {

	ranking_map = new Map();
	users = [];

	load() {
		let user1 = new User("user123", []);
		let user2 = new User("userabc", []);
		let user3 = new User("userxyz", []);
		this.users.push(user1, user2, user3);

		let date1 = new Date(2024, 0, 28);
		user1.chant_stat.push(new ChantRecord(user1, date1, 2000));
		user2.chant_stat.push(new ChantRecord(user2, date1, 300));
		user3.chant_stat.push(new ChantRecord(user3, date1, 900));

		date1 = new Date(2024, 0, 29);
		user1.chant_stat.push(new ChantRecord(user1, date1, 700));
		user2.chant_stat.push(new ChantRecord(user2, date1, 360));
		user3.chant_stat.push(new ChantRecord(user3, date1, 1900));

		date1 = new Date(2024, 0, 30);
		user1.chant_stat.push(new ChantRecord(user1, date1, 100));
		user2.chant_stat.push(new ChantRecord(user2, date1, 3900));
		user3.chant_stat.push(new ChantRecord(user3, date1, 9400));
	}

	get_rank_list(date) {
		let date_chant_stat = this.ranking_map.get(date);
		if (!date_chant_stat) {
			date_chant_stat = this.users.flatMap(user => user.chant_stat)
				.filter(record => record.date == date)
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

	create_chant_card_by_user(userId) {
		let cards_list = []
		let user = this.users.find(u => u.user_id == userId);
		if (user) {
			cards_list = this.users.find(u => u.user_id == userId).chant_stat.map(item => {
				let date_rank_list = this.get_rank_list(item.chant_date);
				let rank = date_rank_list.indexOf(item) + 1;
				return new UIChantCard(item, rank, date_rank_list[0]);
			}).sort((card1, card2) => (card1.chant_date.getTime() - card2.chant_date.getTime()));
		}



		// for(var i = 0; i < user.chant_stat.length; i++){
		// 	user_record = user.chant_stat[i];
		// 	date_rank_list = get_rank_list(user_record.chant_date);
		// 	cards_list.push(new UIChantCard(user_record,date_rank_list.indexOf(user_record)+1,date_rank_list[0]));
		// }
		return cards_list;
	}

}
// get_rank_list(new Date(2024,0,30));

export {DataLoader};