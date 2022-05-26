import React from "react";
import Questionnaire from "./Screens/Questionnaire.js";
import Login from "./Screens/Login.js";
import Register from "./Screens/Register.js";
import Family from "./Screens/Family.js";
import AddChild from "./Screens/AddChild.js"
import { openDatabase } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const db = openDatabase('db.DualTracking')

db.transaction(function(txn) {
  var query = "CREATE TABLE IF NOT EXISTS Responses (id INTEGER PRIMARY KEY AUTOINCREMENT, childId INTEGER NOT NULL, questionId INTEGER NOT NULL, value INTEGER NOT NULL, date DATE NOT NULL);"
  txn.executeSql(
    query, //Query to execute as prepared statement
    [],  
    function(tx, res) {console.log(res)},  //Callback function to handle the result
    (txObj, error) => console.log('Error', error)
  );
  query = "CREATE TABLE IF NOT EXISTS Children (id INTEGER PRIMARY KEY, name VARCHAR(255) NOT NULL, dob DATE NOT NULL, gender VARCHAR(10) NOT NULL, userId VARCHAR(255) NOT NULL);"
  txn.executeSql(
    query,  //Query to execute as prepared statement
    [],
    function(tx, res) {console.log(res)}, //Callback function to handle the result
    (txObj, error) => console.log('Error', error)
  );
  query = "CREATE TABLE IF NOT EXISTS User (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, pass VARCHAR(255) NOT NULL);"
  txn.executeSql(
    query,  //Query to execute as prepared statement
    [],
    function(tx, res) {console.log(res)}, //Callback function to handle the result
    (txObj, error) => console.log('Error', error)
  );
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="AddChild" component={AddChild}/>
        <Stack.Screen name="Family" component={Family} options={{headerShown: false}}/>
        <Stack.Screen name="Questionnaire" component={Questionnaire} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}