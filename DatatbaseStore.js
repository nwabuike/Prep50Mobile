/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import { exists } from 'react-native-fs';
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'prep502.db';
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
                            db = DB;
                            checkTables = db.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='{questions}'")
                            .then((x)=>{
                              // console.log(x,'Question table Found');
                            }).catch(error=>{
                                console.log(error);
                            });
                            // console.log(checkTables);
                            if(checkTables == null){
                                   
                            }else{
                                 console.log('Ok do not create tables ')
                                 console.log('ok create tables');
                                   db.executeSql('CREATE TABLE IF NOT EXISTS user (id int(3) PRIMARY KEY, firstname varchar(50) , othername varchar(50) , lastname varchar(50) , phone varchar(20) , dateReg varchar(20) , gender varchar(100) , email varchar(50) , totalCoinsAccrued varchar(100) , totalCurrentCoin varchar(100) , accessToken varchar(255) , nextPayment varchar(50) )')
                                   .then(() => {
                                       console.log('User table created Successfully');
                                   })
                                   .then(() => {
                                       db.transaction(tx => {
                                           tx.executeSql(
                                               'CREATE TABLE IF NOT EXISTS subjects (id int(3) PRIMARY KEY, subjName varchar(100) )'
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
                                             'CREATE TABLE IF NOT EXISTS activity (id int(3) PRIMARY KEY, tmpAct varchar(100))'
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
                                           'CREATE TABLE IF NOT EXISTS topics (id int(3) PRIMARY KEY, topic varchar(100), subject_id int(3))'
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
                                         'CREATE TABLE IF NOT EXISTS objectives (id int(3) PRIMARY KEY, title varchar(100), creditLoad varchar(100), topic_id int(3), subject_id int(3))'
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
                                       'CREATE TABLE IF NOT EXISTS questions (id int(3) PRIMARY KEY, topic_id int(3) , objective_id int(3) , question varchar(100) , optionA varchar(100) , optionB varchar(100) , optionC varchar(100) , optionD varchar(100) , answer varchar(100) , passage varchar(100) , quesYear varchar(100) , quesYearNum varchar(100) , explanation varchar(100) )'
                                   );
                               })
                                   .then(() => {
                                       console.log('Question table created Successfully');
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
                            }
                            console.log('Database Opened');
                            console.log(db, 'Prep50 database  ready');
                           
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
          tx.executeSql('INSERT INTO user(id, firstname, othername, lastname, phone, dateReg, gender, email, totalCoinsAccrued, totalCurrentCoin, accessToken) VALUES (1,"'+user.firstname+'","'+user.othername+'","'+user.lastname+'","'+user.phone+'","'+user.dateReg+'","'+user.gender+'","'+user.email+'","'+user.totalCoinsAccrued+'","'+user.totalCurrentCoin+'","'+user.accessToken+'")', []).then(([tx, results]) => {
          resolve(results);
          });
        })
        .then((results) => {
          console.log(results,'data inserted table created Successfully');
      })
        .then((result) => {
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
            tx.executeSql('INSERT INTO activities(id, tmpAct) VALUES (1,0)', []).then(([tx, results]) => {
            resolve(results);
            });
          }).then((result) => {
            console.log(results, 'Activities inserted');
          })
          .then((result) => {
            this.closeDatabase(db);
          }).catch((err) => {
            console.log(err);
          });
          }).catch((err) => {
          console.log(err, 'Activity not inserted');
          });
        });  
        }

          //User subject
          addUserSubj() {
            return new Promise((resolve) => {
              this.initDB().then((db) => {
              db.transaction((tx) => {
                tx.executeSql('INSERT INTO subjects(id, subjName) VALUES ("'+subject_id+'", "'+subj+'")', []).then(([tx, results]) => {
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
            tx.executeSql('INSERT INTO topics(id, topic, subject_id) VALUES ("'+id+'","'+topic+'", "'+subj_id+'")', []).then(([tx, results]) => {
            resolve(results);
            });
          }).then((results)=> {
             console.log(results, 'topic inserted')
          })
          .then((result) => {
            this.closeDatabase(db);
          }).catch((err) => {
            console.log(err);
          });
          }).catch((err) => {
          console.log(err, 'Topics not inserted');
          });
        });  
        }
          
        //User Objective
        addUserObj() {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
          db.transaction((tx) => {
            tx.executeSql('INSERT INTO objectives(id, title, creditLoad, topic_id, subject_id) VALUES ("'+id+'", "'+title+'", "'+creditLoad+'", "'+topic_id+'", "'+subject_id+'")', []).then(([tx, results]) => {
            resolve(results);
            });
          }).then((results)=> {
            console.log(results, 'Objective inserted')
         })
          .then((result) => {
            this.closeDatabase(db);
          }).catch((err) => {
            console.log(err);
          });
          }).catch((err) => {
          console.log(err, 'Objectives not inserted');
          });
        });  
        }
    
        addUserQuestion() {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
          db.transaction((tx) => {
            tx.executeSql('INSERT INTO questions(id, topic_id, objective_id, question, optionA, optionB, optionC, optionD, answer, passage, quesYear, quesYearNum, explanation) VALUES ("'+id+'", "'+topic_id+'", "'+objective_id+'", "'+question+'", "'+optionA+'", "'+optionB+'", "'+optionC+'", "'+optionD+'", "'+answer+'", "'+passage+'", "'+quesYear+'", "'+quesYearNum+'", "'+explanation+'")', []).then(([tx, results]) => {
            resolve(results);
            });
          }).then((results)=> {
            console.log(results,'Question inserted')
         })
          .then((result) => {
            this.closeDatabase(db);
          }).catch((err) => {
            console.log(err);
          });
          }).catch((err) => {
          console.log(err, 'Question Not inserted');
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


      
    //        //user Subject
    //     addUserSubj() {
    //     return new Promise((resolve) => {
    //       this.initDB().then((db) => {
    //       db.transaction((tx) => {
    //         let subjectQuery = "INSERT INTO userSubj (id, tmpSbjreg) VALUES";
    // for (let i = 0; i < Data.length; ++i) {
    //   subjectQuery = subjectQuery + "('"
    //     + Data[i].id //id
    //     + "','"
    //     + Data[i].tmpSbjreg //is_deleted
    //     + "')";
    //   if (i != Data.length - 1) {
    //     subjectQuery = subjectQuery + ",";
    //   }
    // }
    // subjectQuery = subjectQuery + ";";
    // console.log(subjectQuery);
    // let userSubject = tx.executeSql(subjectQuery, []);
    // console.log(userSubject);
    //       })
    //       .then(() => {
    //         this.closeDatabase(db);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //       }).catch((err) => {
    //       console.log(err);
    //       });
    //     });  
    //     }

       
}