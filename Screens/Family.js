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
import { data } from "../Data";
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
                        query = `Select * , max(date) from Responses WHERE childId = ${child.id} GROUP BY questionId Order By date; `
                        txn.executeSql(
                            query,  //Query to execute as prepared statement
                            [],
                            function(tx, res) {
                                console.log("Get Latest Responses of All Questionnaires of a Specific User :",res)
                                let Questionnaires = JSON.parse(JSON.stringify(data));
                                let rows = res.rows._array;
                                for (let index = 0; index < Questionnaires.length; index++) {
                                    let response = rows.find(value => value.questionId === Questionnaires[index].id);
                                    if(response!=undefined){
                                        var ONE_DAY = 1000 * 60 * 60 * 24;
                                        var daysDiff = Math.floor(Math.abs(new Date().getTime() - new Date(response.date).getTime())/ONE_DAY);
                                        if(daysDiff===0){
                                            Questionnaires[index].Value = response.value;
                                        }
                                        else if(daysDiff<Questionnaires[index].frequency){
                                            Questionnaires.splice(index,1);
                                            index--;
                                        }
                                    }
                                }
                                console.log(Questionnaires);
                                temp.push(<ChildIcon key={child.id} child={child} userId={props.route.params.userId} navigation={props.navigation} Questionnaires={Questionnaires}></ChildIcon>);
                                setChildren([]);
                                setChildren(temp);
                            }, //Callback function to handle the result
                            (txObj, error) => console.log('Error', error)
                        );
                    });
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