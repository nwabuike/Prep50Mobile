/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'prep50.db';
const database_version = '1.0';
const database_displayname = 'Prep50';
const database_size = 200000;

export default class Database {
    initDB() {
        let db;
        return new Promise(resolve => {
            console.log('Plugin integrity check...');
            SQLite.echoTest()
                .then(() => {
                    console.log('Integrity check passed ...');
                    console.log('opening database ...');
                    SQLite.openDatabase(
                        database_name,
                        database_version,
                        database_displayname,
                        database_size,
                    )
                        .then(DB => {
                            db => DB;
                            console.log('Database Open');
                            db.executeSql('CREATE TABLE IF NOT EXISTS User (id int(3) PRIMARY KEY, firstname varchar(100) NOT NULL, othername varchar(100) NOT NULL, lastname varchar(100) NOT NULL, phone varchar(100) NOT NULL, dateReg varchar(100) NOT NULL, gender varchar(100) NOT NULL, email varchar(100) NOT NULL, img varchar(100) NULL, totalCoinsAccrued varchar(100) NOT NULL, totalCurrentCoin varchar(100) NOT NULL, accessToken varchar(255) NOT NULL')
                                .then(() => {
                                    console.log('User table created Successfully');
                                })
                                .then(() => {
                                    db.transaction(tx => {
                                        tx.executeSql(
                                            'CREATE TABLE IF NOT EXISTS userSubj (id int(3) PRIMARY KEY, tmpSbjreg varchar(100) NOT NULL, tmpSbjreg varchar(100) NOT NULLtmpSbjreg varchar(100) NOT NULL)'
                                        );
                                    })
                                        .then(() => {
                                            console.log('UserSubject table created Successfully');
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        });
                                })
                                .then(() => {
                                  db.transaction(tx => {
                                      tx.executeSql(
                                          'CREATE TABLE IF NOT EXISTS activity (id int(3) PRIMARY KEY, tmpAct varchar(100) NOT NULL)'
                                      );
                                  })
                                      .then(() => {
                                          console.log('Activity table created Successfully');
                                      })
                                      .catch(error => {
                                          console.log(error)
                                      });
                              })
                              .then(() => {
                                db.transaction(tx => {
                                    tx.executeSql(
                                        'CREATE TABLE IF NOT EXISTS topics (id int(3) PRIMARY KEY, topic varchar(100) NOT NULL, subject_int int(3) NOT NULL)'
                                    );
                                })
                                    .then(() => {
                                        console.log('Topic table created Successfully');
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    });
                            })
                            .then(() => {
                              db.transaction(tx => {
                                  tx.executeSql(
                                      'CREATE TABLE IF NOT EXISTS objectives (id int(3) PRIMARY KEY, title varchar(100) NOT NULL, creditLoad varchar(100) NOT NULL, topic_id int(3) NOT NULL, subject_id int(3) NOT NULL)'
                                  );
                              })
                                  .then(() => {
                                      console.log('Objectives table created Successfully');
                                  })
                                  .catch(error => {
                                      console.log(error)
                                  });
                          })
                          .then(() => {
                            db.transaction(tx => {
                                tx.executeSql(
                                    'CREATE TABLE IF NOT EXISTS questions (id int(3) PRIMARY KEY, topic_id int(3), objective_id int(3), question varchar(100), optionA varchar(100), optionB varchar(100) optionC varchar(100) optionD varchar(100), answer varchar(100) NOT NULL, passage varchar(100) NOT NULL, quesYear varchar(100) NOT NULL, quesYearNum varchar(100), explanation varchar(100))'
                                );
                            })
                                .then(() => {
                                    console.log('UserSubject table created Successfully');
                                })
                                .catch(error => {
                                    console.log(error)
                                });
                        })
                                .catch(error => {
                                    console.log('Received Error:', error);
                                    console.log('Database not yet ready ... Populating data');

                                });
                            resolve(db);
                        })
                        .catch(error => {
                            console.log(error);

                        });
                })
                .catch(error => {
                    console.log('echoTest failed - plugin not function', error);

                });
        });

    }
    closeDatabase(db) {
        if (db) {
            console.log('Close DB');
            db.close()
                .then(status => {
                    console.log('Database Closed');

                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            console.log('Database was not Opened');
        }

    }
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
            tx.executeSql('INSERT INTO activities VALUES (?,)', [tmpAct]).then(([tx, results]) => {
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
            let subjectQuery = "INSERT INTO userSubj (id, subj) VALUES";
    for (let i = 0; i < Data.length; ++i) {
      subjectQuery = subjectQuery + "('"
        + Data[i].id //id
        + "','"
        + Data[i].subj //is_deleted
        + "')";
      if (i != Data.length - 1) {
        subjectQuery = subjectQuery + ",";
      }
    }
    subjectQuery = subjectQuery + ";";
    console.log(subjectQuery);
    let userSubject = tx.executeSql(subjectQuery, []);
    console.log(userSubject);
          }).then(() => {
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

        getUser(){
          return new Promise((resolve) => {
            const userSubj = [];
        
            this.initDB().then((db) => {
              db.transaction((tx) => {
                tx.executeSql("SELECT * FROM user", []).then(([tx,results]) => {
                  var len = results.rows.length;
                  
                  for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    
                    const {  id, firstname, lastname, othername, accessToken } = row;
                    userSubj.push({
                      id,
                      firstname,
                      lastname,
                      othername,
                      accessToken
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