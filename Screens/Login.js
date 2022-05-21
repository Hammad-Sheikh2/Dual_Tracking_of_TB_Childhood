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


export default function Login(props){
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={false} />
            <View style={{flex:3}}>
                <Image style={styles.imageLogo} source={require('../Icons/logo.png')} />
            </View>
            <View style={[{flex:4},styles.loginBox]}>
                <TextInput style={styles.inputBox} placeholder="Username"></TextInput>
                <TextInput style={styles.inputBox} secureTextEntry={true} placeholder="Password"></TextInput>
                <TouchableOpacity style={styles.loginButton} onPress={()=>{props.navigation.navigate("Family");}}>
                    <Text style ={{color:'white',fontWeight:"bold"}}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={[{flex:1},styles.registerBox]}>
                <Text>Didn't have an account? <Link style={styles.registerLink} to={"/Register"}>Register</Link>?</Text>
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
    loginBox:{
        width:'100%',
        justifyContent:"center",
        alignItems:'center'
    },
    loginButton:{
        marginVertical:15,
        marginHorizontal:5,
        width:'90%',
        padding:20,
        borderRadius:10,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:"#000018"
    },
    registerBox:{
        justifyContent:'flex-end',
        alignItems:'center',
        paddingBottom:30,
    },
    registerLink:{
        color:'#0000BB',
        fontWeight:'bold',
        fontSize:15
    },
    imageLogo:{
        flex: 1,
        aspectRatio: 1.5, 
        resizeMode: 'contain',
        margin:10,
    }
})