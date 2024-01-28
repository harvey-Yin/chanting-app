class DataLoader {

	ranking_map = new Map();
	users = [];

	load() {
		user1 = User("user123", []);
		user2 = User("userabc", []);
		user3 = User("userxyz", []);
		users.push(user1, user2, user3);

		date1 = new Date(2024, 0, 28);
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
	};

	get_rank_list(date) {
		date_chant_stat = ranking_map.get(date);
		if (!date_chant_stat) {
			date_chant_stat = users.flatMap(user => user.chant_stat)
				.filter(record => record.date == date)
				.sort((a, b) => a.chant_count - b.chant_count);

			ranking_map.set(date, date_chant_stat);

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
	};

	create_chant_card_by_user(userId) {
		cards_list = []
		user = users.find(u => u.user_id == userId);
		if (user) {
			cards_list = users.find(u => u.user_id == userId).chant_stat.map(item => {
				date_rank_list = get_rank_list(item.chant_date);
				rank = date_rank_list.indexOf(user_record) + 1;
				return UIChantCard(item, rank, date_rank_list[0]);
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