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

export default class DatabaseStore {
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
                                }).then(() => {
                                    db.transaction(tx => {
                                        tx.executeSql(
                                            'CREATE TABLE IF NOT EXISTS userSubj (id int(3) PRIMARY KEY, tmpSbjreg varchar(100) NOT NULL, tmpSbjreg varchar(100) NOT NULLtmpSbjreg varchar(100) NOT NULL)'
                                        );
                                    })
                                        .then(() => {
                                            console.log('User table created Successfully');
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
}