import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Easing,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Link } from "@react-navigation/native";
import { route } from "../assets/route";
import { openDatabase } from "expo-sqlite";
const db = openDatabase("db.DualTracking");

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabler, setDisabler] = useState(false);
  useEffect(() => {
    db.transaction(function (txn) {
      var query = "Select * from User;";
      txn.executeSql(
        query, //Query to execute as prepared statement
        [],
        function (tx, res) {
          console.log("Login Check User Already Exists or Not :",res.rows._array);
          if (res.rows._array.length > 0) {
            props.navigation.navigate("Family", {
              userId: res.rows._array[0].id,
            });
            ok = true;
          }
        }, //Callback function to handle the result
        (txObj, error) => console.log("Error", error)
      );
    });
  }, []);
  function ValidateUser(){
    if (username === "" || password == "") {
      Alert.alert("Warning", "Enter login credentials.", [
        { text: "cancel", onPress: () => {} },
        { text: "ok", onPress: () => {} },
      ]);
      return;
    }
    setDisabler(true);
    db.transaction(function (txn) {
      var query = `Select * from User where name = '${username}' and pass = '${password}';`;
      txn.executeSql(
        query, //Query to execute as prepared statement
        [],
        function (tx, res) {
          console.log("Login Check User Already Exists or Not :",res.rows._array);
          if (res.rows._array.length > 0) {
            props.navigation.navigate("Family", {
              userId: res.rows._array[0].id,
            });
          }
        }, //Callback function to handle the result
        (txObj, error) => {
          console.log("Error", error);
          Alert.alert("Warning", error.message, [
              { text: "cancel", onPress: () => {} },
              { text: "ok", onPress: () => {} }
          ]);
        }
      );
    });
    setUsername("");
    setPassword("");
    setDisabler(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} />
      <View style={{ flex: 3 }}>
        <Image style={styles.imageLogo} source={require("../Icons/logo.png")} />
      </View>
      <View style={[{ flex: 4 }, styles.loginBox]}>
        <TextInput
          style={styles.inputBox}
          value={username}
          onChangeText={(value) => {
            setUsername(value);
          }}
          placeholder="Username"
        ></TextInput>
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={(value) => {
            setPassword(value);
          }}
          secureTextEntry={true}
          placeholder="Password"
        ></TextInput>
        <TouchableOpacity
          style={styles.loginButton}
          disabled={disabler}
          onPress={ValidateUser}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>{disabler?"Please wait...":"Login"}</Text>
        </TouchableOpacity>
      </View>
      <View style={[{ flex: 1 }, styles.registerBox]}>
        <Text>
          Didn't have an account?{" "}
          <Link style={styles.registerLink} to={"/Register"}>
            Register
          </Link>
          ?
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputBox: {
    margin: 5,
    width: "90%",
    height: 50,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
  loginBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    marginVertical: 15,
    marginHorizontal: 5,
    width: "90%",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000018",
  },
  registerBox: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
  },
  registerLink: {
    color: "#0000BB",
    fontWeight: "bold",
    fontSize: 15,
  },
  imageLogo: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: "contain",
    margin: 10,
  },
});
