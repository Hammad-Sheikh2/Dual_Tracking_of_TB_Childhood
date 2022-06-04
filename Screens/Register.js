import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Alert
} from "react-native";
import React, { useState } from "react";
import { Link } from "@react-navigation/native";
import { openDatabase } from 'expo-sqlite';
import { route } from "../assets/route";
const db = openDatabase('db.DualTracking')

export default function Register(props){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [phn,setPhn] = useState("");
    const [address,setAddress] = useState("");
    const [disabler, setDisabler] = useState(false);
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={false} />
            <View style={{flex:2,justifyContent:'center',alignItems:'center',marginVertical:40}}>
                <Text style={{fontSize:30,fontWeight:'bold',margin:20,color:'#000018'}}>Create account</Text>
                <Text style={{fontSize:15}}>Already have an account?  
                    <Link style={styles.registerLink} to={"/Login"}> Login</Link>
                </Text>
            </View>
            <View style={[{flex:4},styles.registerBox]}>
                <TextInput value={username} onChangeText={(value)=>{setUsername(value)}} style={styles.inputBox} placeholder="Username"></TextInput>
                <TextInput value={password} onChangeText={(value)=>{setPassword(value)}} style={styles.inputBox} placeholder="Password"></TextInput>
                <TextInput value={phn} onChangeText={(value)=>{setPhn(value)}} style={styles.inputBox} placeholder="Phone Number" keyboardType="phone-pad"></TextInput>
                <TextInput value={address} onChangeText={(value)=>{setAddress(value)}} style={[styles.inputBox,{height:100}]} placeholder="Address" multiline={true} numberOfLines={4}></TextInput>
                <TouchableOpacity style={styles.registerButton} disabled={disabler} onPress={()=>{
                    if(username===""||password==""||phn===""||address==""){
                        Alert.alert("Warning", "Incomplete Details.", [
                            { text: "cancel", onPress: () => {} },
                            { text: "ok", onPress: () => {} }
                        ]);
                        return;
                    }
                    setDisabler(true);
                    fetch(`${route}/api/Users/SignUp`, {
                        method: 'POST',
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                        userName: username,
                        password: password,
                        phoneNumber:phn,
                        address:address
                        }),
                    }).then((response) => {
                        console.log(response.status);
                        if(response.status===200)
                            return response.json();
                        else if(response.status===400){
                            throw new Error("User Already Registered");
                        }
                        else{
                            throw new Error();
                        }
                    })
                    .then((responseJson) => {
                        console.log('Registered User Data :', responseJson)
                        db.transaction(function(txn) {
                            var query = "INSERT into User(id,name,pass) VALUES(?,?,?);";
                            txn.executeSql(
                              query, //Query to execute as prepared statement
                              [`${responseJson.id.toString()}`,username,password],
                              function(tx, res) {
                                  console.log("Rows Affected :",res.rowsAffected)
                                  Alert.alert("Success", "You successfully registered your account.", [
                                    { text: "ok", onPress: () => {setDisabler(false);props.navigation.goBack();} }
                                ]);
                              },  //Callback function to handle the result
                              (txObj, error) => console.log('Error', error)
                            );
                        });
                    })
                    .catch(error => {
                        Alert.alert("Error", error.toString(), [
                            { text: "cancel", onPress: () => {} },
                            { text: "ok", onPress: () => {} }
                        ]);
                        console.log(error)
                    });

                }}>
                    <Text style ={{color:'white',fontWeight:"bold"}}>{disabler?"Please wait...":"Register"}</Text>
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
    }
})