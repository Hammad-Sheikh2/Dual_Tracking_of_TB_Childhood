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
    TextInput
} from "react-native";
import React, { useState } from "react";
import { Link } from "@react-navigation/native";


export default function Register(props){
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
                <TextInput style={styles.inputBox} placeholder="Username"></TextInput>
                <TextInput style={styles.inputBox} placeholder="Password"></TextInput>
                <TextInput style={styles.inputBox} placeholder="Phone Number" keyboardType="phone-pad"></TextInput>
                <TextInput style={[styles.inputBox,{height:100}]} placeholder="Address" multiline={true} numberOfLines={4}></TextInput>
                <TouchableOpacity style={styles.registerButton} onPress={()=>{props.navigation.navigate("Family");}}>
                    <Text style ={{color:'white',fontWeight:"bold"}}>Register</Text>
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