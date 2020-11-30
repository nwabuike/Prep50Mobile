/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View,Text} from 'react-native';
import SQLite from 'react-native-sqlite-storage';


global.db = SQLite.openDatabase(
  {
    name: 'Prep50',
    location: 'default',
    createFromLocation: 'prep50.db',
    // version = "1.0",
    // displayname = "PREP50 database",
    // size = 200000,
  },
  () => { },
  error => {
    console.log("ERROR: " + error);
  }
);

export default class database extends React.Component {

  constructor() {
    super();
    SQLite.DEBUG = true;
    // SQLite.enablePromise(true);
  }

  async componentDidMount() {
    console.log("componentDidMount");
    await this.CreateTable();
    await this.InsertQuery();
    await this.UpdateQuery();
    await this.DeleteQuery();
    await this.SelectQuery();
    await this.JoinsQuery();
  }

  /**
  * Execute sql queries
  * 
  * @param sql
  * @param params
  * 
  * @returns {resolve} results
  */
  ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(sql, params, (trans, results) => {
        resolve(results);
      },
        (error) => {
          reject(error);
        });
    });
  });

  /**
   * Example Of Create table on SQLite
   */
  async CreateTable() {
    console.log("CreateTable");
    
    //create User Table
    let userTable = await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY NOT NULL,firstname varchar(30) NOT NULL, othername varchar(30) NOT NULL, lastname varchar(100) NOT NULL, phone varchar(100) NOT NULL, dateReg varchar(100) NOT NULL, gender varchar(100) NOT NULL, email varchar(100) NOT NULL, img varchar(100) NULL, totalCoinsAccrued varchar(100) NOT NULL, totalCurrentCoin varchar(100) NOT NULL, accessToken varchar(255) NOT NULL)", []);
    console.log(userTable);

    // Create  Activity Table
    let activityTable = await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY NOT NULL, user_id INTEGER, country_name VARCHAR(16), is_deleted INTEGER)", []);
    console.log(activityTable);

    //create User Subjects Table
    let userSubjTable = await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS UserSubj (id INTEGER PRIMARY KEY NOT NULL, user_id INTEGER, country_name VARCHAR(16), is_deleted INTEGER)", []);
    console.log(userSubjTable);
   
    // create Topic Table
    let topicTable = await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS topics (id INTEGER PRIMARY KEY NOT NULL, user_id INTEGER, country_name VARCHAR(16), is_deleted INTEGER)", []);
    console.log(topicTable);

    // Create Objective Table
    let objectiveTable = await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS objectives (id INTEGER PRIMARY KEY NOT NULL, user_id INTEGER, country_name VARCHAR(16), is_deleted INTEGER)", []);
    console.log(objectiveTable);

    // Create Question Table
    let questionTable = await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY NOT NULL, user_id INTEGER, country_name VARCHAR(16), is_deleted INTEGER)", []);
    console.log(questionTable);
  }

  /**
   *  Example Of Insert Rows on SQLite
   */
  async InsertQuery() {

    // insert User query 
    let userInsert = await this.ExecuteQuery('INSERT INTO user(id, name, othername, lastname, phone, dateReg, gender, email, totalCoinsAccrued, totalCurrentCoin, accessToken) VALUES (1,"'+user.firstname+'","'+user.othername+'","'+user.lastname+'","'+user.phone+'","'+user.dateReg+'","'+user.gender+'","'+user.email+'","'+user.totalCoinsAccrued+'","'+user.totalCurrentCoin+'","'+user.accessToken+'")', []);
    console.log(userInsert);

    
      //User Activity
      let activityQuery = "INSERT INTO activities (id, tmpAct) VALUES";
      for (let i = 0; i < Data.length; ++i) {
        activityQuery = activityQuery + "('"
          + Data[i].id //id
          + "','"
          + Data[i].tmpAct //is_deleted
          + "')";
        if (i != Data.length - 1) {
          activityQuery = activityQuery + ",";
        }
      }
      activityQuery = activityQuery + ";";
      console.log(activityQuery);
  
      let activity = await this.ExecuteQuery(activityQuery, []);
      console.log(activity);
    
    // User Subject
    let subjectQuery = "INSERT INTO user (id, subj) VALUES";
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
    let userSubject = await this.ExecuteQuery(subjectQuery, []);
    console.log(userSubject);

    //User Topic
    let TopicQuery = "INSERT INTO topics (id, topic, subj_id) VALUES";
    for (let i = 0; i < Data.length; ++i) {
      TopicQuery = TopicQuery + "('"
        + Data[i].id //id
        + "','"
        + Data[i].topic //first_name
        + "','"
       
        + Data[i].subj_id //is_deleted
        + "')";
      if (i != Data.length - 1) {
        TopicQuery = TopicQuery + ",";
      }
    }
    TopicQuery = TopicQuery + ";";
    console.log(TopicQuery);

    let topics = await this.ExecuteQuery(TopicQuery, []);
    console.log(topics);

    // insert objectives
    let objectiveQuery = "INSERT INTO objectives (id, title, creditLoad, topic_id, userSubj_id) VALUES";
    for (let i = 0; i < Data.length; ++i) {
      objectiveQuery = objectiveQuery + "('"
        + Data[i].id //id
        + "','"
        + Data[i].title //first_name
        + "','"
        + Data[i].creditLoad //last_name
        + "','"
        + Data[i].topic_id //last_name
        + "','"
        + Data[i].userSubj_id //is_deleted
        + "')";
      if (i != Data.length - 1) {
        objectiveQuery = objectiveQuery + ",";
      }
    }
    objectiveQuery = objectiveQuery + ";";
    console.log(objectiveQuery);

    let objectives = await this.ExecuteQuery(objectiveQuery, []);
    console.log(objectives);

    //question insert

    let questionQuery = "INSERT INTO questions (id, topic_id, objective_id, question, optionA, optionB, optionC, optionD, answer, passage, quesYear, quesYearNum, explanation) VALUES";
    for (let i = 0; i < questionData.length; ++i) {
      questionQuery = questionQuery + "('"
        + questionData[i].id //id
        + "','"
        + questionData[i].topic_id //user_id
        + "','"
        + questionData[i].objective_id //question_name
        + "','"
        + questionData[i].question //user_id
        + "','"
        + questionData[i].optionA //question_name
        + "','"
        + questionData[i].optionB //user_id
        + "','"
        + questionData[i].optionC //user_id
        + "','"
        + questionData[i].optionD //user_id
        + "','"
        + questionData[i].answer //question_name
        + "','"
        + questionData[i].passage //user_id
        + "','"
        + questionData[i].quesYear //user_id
        + "','"
        + questionData[i].quesYearNum //user_id
        + "','"
        + questionData[i].explanation //is_deleted
        + "')";
      if (i != questionData.length - 1) {
        questionQuery = questionQuery + ",";
      }
    }
    questionQuery = questionQuery + ";";
    console.log(questionQuery);

    let questionsInsert = await this.ExecuteQuery(questionQuery, []);
    console.log(questionsInsert);
  }

  /**
   * Example Of update query
   */
  async UpdateQuery() {
    let updateQuery = await this.ExecuteQuery('UPDATE users SET first_name = ? , last_name = ? WHERE id = ?', ["Doctor", "Strange", 3]);

    console.log(updateQuery);
  }

  /**
   * Delete Query Example
   */
  async DeleteQuery() {
    let deleteQuery = await this.ExecuteQuery('DELETE FROM users WHERE id = ?', [4]);

    console.log(deleteQuery);
  }

  /**
   * Select Query Example
   */
  async SelectQuery() {
    let selectQuery = await this.ExecuteQuery("SELECT * FROM users", []);
    var rows = selectQuery.rows;
    for (let i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      console.log(item);
    }
  }

  /**
   * Joins Example
   */
  async JoinsQuery() {
    // INNER JOIN
    let innerJoin = await this.ExecuteQuery("SELECT users.id, users.first_name, users.last_name, c.country_name FROM users INNER JOIN country c on c.user_id = users.id", []);
    var rows = innerJoin.rows;
    for (let i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      console.log(item);
    }
    console.log(innerJoin);

    // LEFT JOIN
    let leftJoin = await this.ExecuteQuery("SELECT users.id, users.first_name, users.last_name, c.country_name FROM users LEFT JOIN country c on c.user_id = users.id", []);
    var rows = leftJoin.rows;
    for (let i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      console.log(item);
    }
    console.log(leftJoin);

    // RIGHT JOIN
    let rightJoin = await this.ExecuteQuery("SELECT users.id, users.first_name, users.last_name, c.country_name FROM users RIGHT JOIN country c on c.user_id = users.id", []);
    var rows = rightJoin.rows;
    for (let i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      console.log(item);
    }
    console.log(rightJoin);

    // FULL OUTER JOIN
    let fullOutterJoin = await this.ExecuteQuery("SELECT users.id, users.first_name, users.last_name, c.country_name FROM users FULL OUTER JOIN country c on c.user_id = users.id", []);
    var rows = fullOutterJoin.rows;
    for (let i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      console.log(item);
    }
    console.log(fullOutterJoin);

  }

  render() {
    return <View style={{ flex: 1 }}><Text style={{ fontFamily: "monospace", fontSize: 30, textAlign: "center" }}>Infinite Ability</Text></View>;
  }
}