import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import React, { useState } from "react";
import DatePicker from "../Components/DatePicker.js"
import { openDatabase } from 'expo-sqlite';
import { route } from "../assets/route.js";
import { getAssetByID } from "react-native-web/dist/cjs/modules/AssetRegistry";
const db = openDatabase('db.DualTracking')

const GenderSelectionDropdown = (props)=>{
    const [gender, setGender] = useState(props.value);
    return(
        <TouchableOpacity style={[styles.inputBox,{flexDirection:'row',justifyContent:"space-between",alignItems:'center'}]}
            onPress={()=>{
                Alert.alert("Gender", "Select gender.", [
                    { text: "Male", onPress: () => {setGender("MALE");props.setValue("MALE")} },
                    { text: "FEMALE", onPress: () => {setGender("FEMALE");props.setValue("FEMALE")} }
                  ]);
            }}
        >
            <Text>{gender}</Text>
            <Text style={styles.placeHolder}>Gender</Text>
        </TouchableOpacity>
    );
}

export default function AddChild(props){
    const [name, setName] = new useState(props.route.params.name);
    const [dob, setDOB] = useState(props.route.params.dob);
    const [gender, setGender] = useState(props.route.params.gender);

    const AddChild = ()=>{
        //Extra code which we will remove later.
        db.transaction(function(txn) {
            var query = `Select * from user where id = '${props.route.params.userId}'`;
            txn.executeSql(
                query, //Query to execute as prepared statement
                [],
                function(tx, res) {
                    console.log(res.rows._array[0]);
                    let user = res.rows._array[0];
                    fetch(`${route}/api/authentication/login`, {
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          userName: user.name,
                          password: user.pass,
                        }),
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            return response.json();
                        } else if (response.status === 400) {
                            throw new Error("Invalid Login Attempt");
                        } else {
                            throw new Error();
                        }
                        })
                    .then((responseJson) => {
                        console.log("ADD CHILD Login ---> DATA : ", responseJson);
                        console.log({
                            name: name,
                            parentId: user.id,
                            dateOfBirth:dob.toISOString(),
                            gender:gender
                        });
                        fetch(`${route}/api/Children/Add`, {
                            method: "POST",
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              name: name,
                              parentId: user.id,
                              dateOfBirth:dob.toISOString(),
                              gender:gender
                            }),
                        })
                        .then((response) => {
                            if (response.status === 200) {
                                return response.json();
                            } else if (response.status === 400) {
                                throw new Error("Invalid Login Attempt");
                            } else {
                                throw new Error();
                            }
                            })
                        .then((responseJson) => {
                            console.log("ADD CHILD ---> DATA : ", responseJson);
                            db.transaction(function(txn) {
                                var query = "INSERT into Children(id,name,dob,gender,userId) VALUES(?,?,?,?,?);"
                                txn.executeSql(
                                    query, //Query to execute as prepared statement
                                    [responseJson.id, name, dob.toDateString(), gender, user.id.toString()],
                                    function(tx, res) {
                                        console.log([responseJson.id, name, dob.toDateString(), gender, user.id.toString()],"Rows Affected :",res.rowsAffected);
                                        Alert.alert("Success","Child Added",[
                                            { text: "ok", onPress: () => {
                                                props.route.params.navigation.goBack();
                                            } },
                                        ]);
                                    },  //Callback function to handle the result
                                    (txObj, error) => console.log('Error', error)
                                );
                            });
                        })
                        .catch((error) => {
                            Alert.alert("Error", error.toString(), [
                                { text: "cancel", onPress: () => {} },
                                { text: "ok", onPress: () => {} },
                            ]);
                              console.log(error);
                        });
                    })
                    .catch((error) => {
                        Alert.alert("Error", error.toString(), [
                            { text: "cancel", onPress: () => {} },
                            { text: "ok", onPress: () => {} },
                        ]);
                        console.log(error);
                    });
                },  //Callback function to handle the result
                (txObj, error) => console.log('Error', error)
            );
        });
    }
    const UpdateChild = ()=>{
        //Extra code which we will remove later.
        db.transaction(function(txn) {
            var query = `Select * from user where id = '${props.route.params.userId}'`;
            txn.executeSql(
                query, //Query to execute as prepared statement
                [],
                function(tx, res) {
                    console.log(res.rows._array[0]);
                    let user = res.rows._array[0];
                    fetch(`${route}/api/authentication/login`, {
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          userName: user.name,
                          password: user.pass,
                        }),
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            return response.json();
                        } else if (response.status === 400) {
                            throw new Error("Invalid Login Attempt");
                        } else {
                            throw new Error();
                        }
                        })
                    .then((responseJson) => {
                        console.log("ADD CHILD Login ---> DATA : ", responseJson);
                        console.log({
                            id:props.route.params.id,
                            name: name,
                            parentId: user.id,
                            dateOfBirth:dob.toISOString(),
                            gender:gender
                        });
                        console.log(`${route}/api/Children/Update/${props.route.params.id}`);
                        fetch(`${route}/api/Children/Update/${props.route.params.id}`, {
                            method: "PUT",
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                id:props.route.params.id,
                                name: name,
                                parentId: user.id,
                                dateOfBirth:dob.toISOString(),
                                gender:gender
                            }),
                        })
                        .then((response) => {
                            if (response.status === 200) {
                                return response.json();
                            } else if (response.status === 400) {
                                throw new Error("Invalid Login Attempt");
                            } else {
                                throw new Error();
                            }
                            })
                        .then((responseJson) => {
                            console.log("ADD CHILD ---> DATA : ", responseJson);
                            db.transaction(function(txn) {
                                var query = `Update Children SET name = '${name}', dob = '${dob.toDateString()}', gender = '${gender}' WHERE id = ${props.route.params.id};`;
                                txn.executeSql(
                                    query, //Query to execute as prepared statement
                                    [],
                                    function(tx, res) {
                                        console.log([responseJson.id, name, dob.toDateString(), gender, user.id.toString()],"Rows Affected :",res.rowsAffected);
                                        Alert.alert("Success","Child Updated",[
                                            { text: "ok", onPress: () => {
                                                props.route.params.navigation.goBack();
                                            } },
                                        ]);
                                    },  //Callback function to handle the result
                                    (txObj, error) => console.log('Error', error)
                                );
                            });
                        })
                        .catch((error) => {
                            Alert.alert("Error", error.toString(), [
                                { text: "cancel", onPress: () => {} },
                                { text: "ok", onPress: () => {} },
                            ]);
                              console.log(error);
                        });
                    })
                    .catch((error) => {
                        Alert.alert("Error", error.toString(), [
                            { text: "cancel", onPress: () => {} },
                            { text: "ok", onPress: () => {} },
                        ]);
                        console.log(error);
                    });
                },  //Callback function to handle the result
                (txObj, error) => console.log('Error', error)
            );
        });
    }
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={false} />
            <View style={{flex:2,justifyContent:'center',alignItems:'center',marginVertical:40}}>
                <Text style={{fontSize:30,fontWeight:'bold',margin:20,color:'#000018'}}>{props.route.params.name===''?"Add Child":"Update Child"}</Text>
                <Text style={{fontSize:15}}>{props.route.params.name===''?"Add to track your child's tuberculosis.":`Update child's details`}</Text>
            </View>
            <View style={[{flex:4},styles.registerBox]}>
                <TextInput style={styles.inputBox} value={name} onChangeText={(e)=>{setName(e)}} placeholder="Name"></TextInput>
                <DatePicker value={dob} setValue={setDOB}></DatePicker>
                <GenderSelectionDropdown value={gender} setValue={setGender}></GenderSelectionDropdown>
                <TouchableOpacity style={styles.registerButton} 
                onPress={()=>{
                    if(name===""){
                        Alert.alert("Warning", "Enter complete details.", [
                            { text: "cancel", onPress: () => {} },
                            { text: "ok", onPress: () => {} }
                        ]);
                        return;
                    }
                    props.route.params.name===''?AddChild():UpdateChild();
                }}>
                    <Text style ={{color:'white',fontWeight:"bold"}}>{props.route.params.name===''?"Add":"Update"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center'
    },
    inputBox:{
        margin:5,
        width:'90%',
        height:50,
        borderRadius:10,
        padding:10,
        backgroundColor:'white'
    },
    registerBox:{
        width:'100%',
        alignItems:'center'
    },
    registerButton:{
        marginVertical:15,
        marginHorizontal:5,
        width:'90%',
        padding:20,
        borderRadius:10,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:"#000018"
    },
    registerLink:{
        color:'#0000BB',
        fontWeight:'bold',
        fontSize:15
    },
    imageLogo:{
        width: 250,
        height: 250
    },
    placeHolder:{
        color:'#9F9F9F'
    }
})