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
    ScrollView,
    TouchableOpacity,
    TextInput
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import ChildIcon from "../Components/ChildIcon";
import FamilySHeader from "../Components/FamilySHeader";
import NetInfo from '@react-native-community/netinfo';
import { openDatabase } from 'expo-sqlite';
const db = openDatabase('db.DualTracking')
export default function Family(props){
    const [Children,setChildren] = useState([]);
    const isFocused = useIsFocused();
    useEffect(()=>{
        db.transaction(function(txn) {
            var query = `Select * from Children where userId = '${props.route.params.userId}';`;
              txn.executeSql(
                query, //Query to execute as prepared statement
                [],
                function(tx, res) {
                    console.log("Family Screen: Saved Children Data : ",res.rows._array);
                    let temp = [];
                    res.rows._array.forEach((child)=>{
                        //console.log(child);
                        temp.push(<ChildIcon key={child.id} child={child} userId={props.route.params.userId} navigation={props.navigation}></ChildIcon>);
                    });
                    setChildren(temp);
                },  //Callback function to handle the result
                (txObj, error) => console.log('Error', error)
            );
        });
        NetInfo.fetch().then(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            if((state.type==='wifi'||state.type==='cellular')&&state.isConnected){
                //*Send Responses..
            }
        });
    },[isFocused])
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={false} />
            <FamilySHeader userId={props.route.params.userId} navigation={props.navigation}></FamilySHeader>
            <ScrollView style={styles.scrollView} centerContent={true} bounces={true}>
                {Children}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    scrollView:{
        flex:1,
        width:'100%',
    }
})