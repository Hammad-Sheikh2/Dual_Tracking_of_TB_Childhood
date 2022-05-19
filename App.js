import React from "react";
import Questionnaire from "./Screens/Questionnaire.js";
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('db.DualTracking')
db.transaction(function(txn) {
  var query = "CREATE TABLE IF NOT EXISTS Responses (id INTEGER PRIMARY KEY AUTOINCREMENT, childId INTEGER NOT NULL, questionId INTEGER NOT NULL, value INTEGER NOT NULL, date DATE NOT NULL);"
  txn.executeSql(
    query, //Query to execute as prepared statement
    [],  
    function(tx, res) {console.log(res)},  //Callback function to handle the result
    (txObj, error) => console.log('Error', error)
  );
  query = "CREATE TABLE IF NOT EXISTS Child (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, dob DATE NOT NULL, gender VARCHAR(10));"
  txn.executeSql(
    query,  //Query to execute as prepared statement
    [],
    function(tx, res) {console.log(res)}, //Callback function to handle the result
    (txObj, error) => console.log('Error', error)
  );
  query = "SELECT * from Responses;"
  txn.executeSql(
    query,  //Query to execute as prepared statement
    [],
    function(tx, res) {console.log(res)},  //Callback function to handle the result
    (txObj, error) => console.log('Error', error)
  );
});

export default function App() {
  return (
    <Questionnaire></Questionnaire>
  );
}