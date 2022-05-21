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
const db = openDatabase('db.DualTracking')

const GenderSelectionDropdown = (props)=>{
    const [gender, setGender] = useState("MALE");
    return(
        <TouchableOpacity style={[styles.inputBox,{flexDirection:'row',justifyContent:"space-between",alignItems:'center'}]}
            onPress={()=>{
                Alert.alert("Gender", "Select gender.", [
                    { text: "Male", onPress: () => {setGender("MALE");props.setValue("MAlE")} },
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
    const [name, setName] = useState("");
    const [dob, setDOB] = useState(new Date());
    const [image, setImage] = useState("childLogo.jpg");
    const [gender, setGender] = useState("MALE");
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={false} />
            <View style={{flex:2,justifyContent:'center',alignItems:'center',marginVertical:40}}>
                
            </View>
            <View style={[{flex:4},styles.registerBox]}>
                <TextInput style={styles.inputBox} value={name} onChangeText={(e)=>{setName(e)}} placeholder="Name"></TextInput>
                <DatePicker setValue={setDOB}></DatePicker>
                <GenderSelectionDropdown setValue={setGender}></GenderSelectionDropdown>
                <TouchableOpacity style={styles.registerButton} 
                onPress={()=>{
                    if(name===""){
                        Alert.alert("Warning", "Enter complete details.", [
                            { text: "cancel", onPress: () => {} },
                            { text: "ok", onPress: () => {} }
                        ]);
                        return;
                    }
                    console.log(name,dob.toDateString(),gender,image);
                    /*db.transaction(function(txn) {
                        data.forEach((value)=>{
                          var query = "INSERT into Children(id,name,image,dob,gender) VALUES(?,?,?,?,?)"
                          txn.executeSql(
                            query, //Query to execute as prepared statement
                            [0, name, "childLogo.jpg", dob, gender],
                            function(tx, res) {console.log(res);},  //Callback function to handle the result
                            (txObj, error) => console.log('Error', error)
                          );
                        })
                    });*/
                }}>
                    <Text style ={{color:'white',fontWeight:"bold"}}>Add</Text>
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