import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "prep50.db";
const database_version = "1.0";
const database_displayname = "PREP50 database";
const database_size = 200000;

export default class Database {
	initDB() {
		let db;
		return new Promise((resolve) => {
		console.log("Plugin integrity check ...");
		SQLite.echoTest()
			.then(() => {
			console.log("Integrity check passed ...");
			console.log("Opening database ...");
			SQLite.openDatabase(
				database_name,
				database_version,
				database_displayname,
				database_size
			)
				.then(DB => {
					db = DB;
					console.log("Database OPEN");
					db.executeSql('SELECT 1 FROM User LIMIT 1').then(() => {
						console.log("Database is ready ... executing query ...");
					}).catch((error) =>{
						console.log("Received error: ", error);
						console.log("Database not yet ready ... populating data");
						db.transaction((tx) => {
							//cr8 user table
							tx.executeSql("CREATE TABLE IF NOT EXISTS User (id int(3) PRIMARY KEY, firstname varchar(100) NOT NULL, othername varchar(100) NOT NULL, lastname varchar(100) NOT NULL, phone varchar(100) NOT NULL, dateReg varchar(100) NOT NULL, gender varchar(100) NOT NULL, email varchar(100) NOT NULL, img varchar(100) NULL, totalCoinsAccrued varchar(100) NOT NULL, totalCurrentCoin varchar(100) NOT NULL, accessToken varchar(255) NOT NULL");
							tx.executeSql("CREATE TABLE IF NOT EXISTS userSubj (id int(3) PRIMARY KEY, tmpSbjreg varchar(100) NOT NULL,");
							tx.executeSql("CREATE TABLE IF NOT EXISTS topic (topicId int(3) PRIMARY KEY, subjId int(3), topicName varchar(100) NOT NULL");
							tx.executeSql("CREATE TABLE IF NOT EXISTS objective (id int(3) PRIMARY KEY, obj varchar(255)");
							tx.executeSql("CREATE TABLE IF NOT EXISTS questions (id int(3) PRIMARY KEY, qs varchar(100), topicId int(20)");
							tx.executeSql("CREATE TABLE IF NOT EXISTS activities (id int(3) PRIMARY KEY, tmpAct varchar(255) Null");
							
								
						}).then(() => {
							console.log("Table created successfully");
						}).catch(error => {
							console.log(error);
						});
					});
					resolve(db);
				})
				.catch(error => {
					console.log(error);
				});
			})
			.catch(error => {
				console.log("echoTest failed - plugin not functional");
			});
		});
	};

	closeDatabase(db) {
		if (db) {
		console.log("Closing DB");
		db.close()
			.then(status => {
			console.log("Database CLOSED");
			})
			.catch(error => {
			this.errorCB(error);
			});
		} else {
		console.log("Database was not OPENED");
		}
	};

	getUserToken(accessToken) {
		return new Promise((resolve) => {
		  const userDetails = [];
		  this.initDB().then((db) => {
			db.transaction((tx) => {
			  tx.executeSql('SELECT accessToken FROM user', []).then(([tx,results]) => {
				console.log("Query completed");
				var len = results.rows.length;
				for (let i = 0; i < len; i++) {
				  let row = results.rows.item(i);
				  console.log(`accessToken: ${row.accessToken}`)
				  const {accessToken} = row;
				  accessToken.push({
					accessToken
				  });
				}
				console.log(accessToken);
				resolve(accessToken);
			  });
			}).then((result) => {
			  this.closeDatabase(db);
			}).catch((err) => {
			  console.log(err);
			});
		  }).catch((err) => {
			console.log(err);
		  });
		});  
	  }
	getUserDetails() {
		return new Promise((resolve) => {
		  const userDetails = [];
		  this.initDB().then((db) => {
			db.transaction((tx) => {
			  tx.executeSql('SELECT id, firstname, othername, lastname, regNum, phone, dateReg, gender, email, img, totalCoinsAccrued, totalCurrentCoin, accessTokenFROM user', []).then(([tx,results]) => {
				console.log("Query completed");
				var len = results.rows.length;
				for (let i = 0; i < len; i++) {
				  let row = results.rows.item(i);
				  console.log(`id: ${row.Id}, User Name: ${row.firstname}`)
				  const { id, firstname, lastname } = row;
				  userDetails.push({
					id,
					firstname,
					lastname
				  });
				}
				console.log(userDetails);
				resolve(userDetails);
			  });
			}).then((result) => {
			  this.closeDatabase(db);
			}).catch((err) => {
			  console.log(err);
			});
		  }).catch((err) => {
			console.log(err);
		  });
		});  
	  }

	  // user subject by id
	// getUserSubjById(id) {
	// 	console.log(id);
	// 	return new Promise((resolve) => {
	// 	  this.initDB().then((db) => {
	// 		db.transaction((tx) => {
	// 		  tx.executeSql('SELECT * FROM userSubject WHERE id = ?', [id]).then(([tx,results]) => {
	// 			console.log(results);
	// 			if(results.rows.length > 0) {
	// 			  let row = results.rows.item(0);
	// 			  resolve(row);
	// 			}
	// 		  });
	// 		}).then((result) => {
	// 		  this.closeDatabase(db);
	// 		}).catch((err) => {
	// 		  console.log(err);
	// 		});
	// 	  }).catch((err) => {
	// 		console.log(err);
	// 	  });
	// 	});  
	//   }

	addUser(user) {
		return new Promise((resolve) => {
		  this.initDB().then((db) => {
			db.transaction((tx) => {
			  tx.executeSql('INSERT INTO user(id, name, othername, lastname, phone, dateReg, gender, email, totalCoinsAccrued, totalCurrentCoin, accessToken) VALUES (1,"'+user.firstname+'","'+user.othername+'","'+user.lastname+'","'+user.phone+'","'+user.dateReg+'","'+user.gender+'","'+user.email+'","'+user.totalCoinsAccrued+'","'+user.totalCurrentCoin+'","'+user.accessToken+'")', []).then(([tx, results]) => {
				resolve(results);
			  });
			}).then((result) => {
			  this.closeDatabase(db);
			}).catch((err) => {
			  console.log(err);
			});
		  }).catch((err) => {
			console.log(err);
		  });
		});  
	  }
	  addUserActivities() {
		return new Promise((resolve) => {
		  this.initDB().then((db) => {
			db.transaction((tx) => {
			  tx.executeSql('INSERT INTO activities VALUES (?)', [tmpAct]).then(([tx, results]) => {
				resolve(results);
			  });
			}).then((result) => {
			  this.closeDatabase(db);
			}).catch((err) => {
			  console.log(err);
			});
		  }).catch((err) => {
			console.log(err);
		  });
		});  
	  }
       //user Subject
	  addUserSubj() {
		return new Promise((resolve) => {
		  this.initDB().then((db) => {
			db.transaction((tx) => {
			  tx.executeSql('INSERT INTO userSubj VALUES (?)', [tmpSbjreg]).then(([tx, results]) => {
				resolve(results);
			  });
			}).then((result) => {
			  this.closeDatabase(db);
			}).catch((err) => {
			  console.log(err);
			});
		  }).catch((err) => {
			console.log(err);
		  });
		});  
	  }

    //user Topid
	  addUserTopic() {
		return new Promise((resolve) => {
		  this.initDB().then((db) => {
			db.transaction((tx) => {
			  tx.executeSql('INSERT INTO topic VALUES (?, ?, ?)', [topicId, topicName, subjId]).then(([tx, results]) => {
				resolve(results);
			  });
			}).then((result) => {
			  this.closeDatabase(db);
			}).catch((err) => {
			  console.log(err);
			});
		  }).catch((err) => {
			console.log(err);
		  });
		});  
	  }
		  
	  //User Objective
	  addUserObj() {
		return new Promise((resolve) => {
		  this.initDB().then((db) => {
			db.transaction((tx) => {
			  tx.executeSql('INSERT INTO objectives VALUES (?)', [obj]).then(([tx, results]) => {
				resolve(results);
			  });
			}).then((result) => {
			  this.closeDatabase(db);
			}).catch((err) => {
			  console.log(err);
			});
		  }).catch((err) => {
			console.log(err);
		  });
		});  
	  }

	  addUserQuestion() {
		return new Promise((resolve) => {
		  this.initDB().then((db) => {
			db.transaction((tx) => {
			  tx.executeSql('INSERT INTO questions VALUES (?, ?)', [qs, topicId]).then(([tx, results]) => {
				resolve(results);
			  });
			}).then((result) => {
			  this.closeDatabase(db);
			}).catch((err) => {
			  console.log(err);
			});
		  }).catch((err) => {
			console.log(err);
		  });
		});  
	  }

	// addUser(user) {
	// 	return new Promise((resolve) => {
	// 		this.initDB().then((db) => {
	// 			db.transaction((tx) => {					
	// 				tx.executeSql('INSERT INTO User (id, name) VALUES (1, "'+user.name+'")', []).then(([tx, results]) => {
	// 					resolve(results);
	// 				});
	// 			}).then((result) => {
	// 				//this.closeDatabase(db);
	// 			}).catch((err) => {
	// 				console.log(err);
	// 			});
	// 		}).catch((err) => {
	// 			console.log(err);
	// 		});
	// 	});  
	// };

	getUser(){
		return new Promise((resolve) => {
			const userSubj = [];
	
			this.initDB().then((db) => {
				db.transaction((tx) => {
					tx.executeSql("SELECT * FROM user", []).then(([tx,results]) => {
						var len = results.rows.length;
						
						for (let i = 0; i < len; i++) {
							let row = results.rows.item(i);
							
							const { id, name} = row;
							userSubj.push({
								id,
								name
							});
						}
						
						resolve(userSubj);
					});
				}).then((result) => {
					this.closeDatabase(db);
				}).catch((err) => {
					console.log(err);
				});
			}).catch((err) => {
				console.log(err);
			});
		});
	}	
}
