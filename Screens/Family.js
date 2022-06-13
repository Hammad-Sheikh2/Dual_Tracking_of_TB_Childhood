import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import ChildIcon from "../Components/ChildIcon";
import FamilySHeader from "../Components/FamilySHeader";
import NetInfo from '@react-native-community/netinfo';
import { openDatabase } from 'expo-sqlite';
import { data } from "../Data";
import { route } from "../assets/route";
const db = openDatabase('db.DualTracking')
export default function Family(props){
    const [Children,setChildren] = useState([]);
    const isFocused = useIsFocused();
    useEffect(()=>{
        db.transaction(function(txn) {
            var query = `Select * from Children where userId = '${props.route.params.userId}';`;
              txn.executeSql(
                query, 
                [],
                function(tx, res) {
                    console.log("Family Screen: Saved Children Data : ",res.rows._array);
                    let temp = [];
                    res.rows._array.forEach((child)=>{
                        query = `Select * , max(date) from Responses WHERE childId = ${child.id} GROUP BY questionId Order By date; `
                        txn.executeSql(
                            query,  
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
                                        Questionnaires[index].responseId = response.id;
                                        if(daysDiff===0){
                                            Questionnaires[index].Value = response.value;
                                        }
                                        else if(daysDiff<Questionnaires[index].frequency){
                                            Questionnaires.splice(index,1);
                                            index--;
                                        }
                                    }
                                }
                                temp.push(<ChildIcon key={child.id} child={child} userId={props.route.params.userId} navigation={props.navigation} Questionnaires={Questionnaires}></ChildIcon>);
                                setChildren([]);
                                setChildren(temp);
                            }, 
                            (txObj, error) => console.log('Error', error)
                        );
                    });
                }, 
                (txObj, error) => console.log('Error', error)
            );
        });
    },[isFocused])
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={false} />
            <FamilySHeader userId={props.route.params.userId} navigation={props.navigation}></FamilySHeader>
            <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView} centerContent={true} bounces={true}>
                {Children.length===0?<NoChildBox userId={props.route.params.userId} navigation={props.navigation}></NoChildBox>:Children}
            </ScrollView>
        </SafeAreaView>
    );
}

function NoChildBox(props){
    return(
        <View style={[styles.container,{justifyContent:'center'}]}>
            <View style={{width:'80%',padding:15,alignItems:'center',marginTop:100}}>
                <Image style={{width:200,height:200,resizeMode:'contain'}} source={require("../Icons/no-user.png")}></Image>
                <Text style={{fontSize:25,fontWeight:'bold'}}>No Child Found</Text>
                <Text>Click the below button to register a child.</Text>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:'60%',backgroundColor:'#000018',marginTop:10,paddingVertical:10,borderRadius:5}} onPress ={()=>{
                    props.navigation.navigate("AddChild",{name:"",dob:new Date,gender:"MALE",userId:props.userId,navigation:props.navigation});
                }}>
                    <Text style={{color:'white'}}>Register Child</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    scrollView:{
        flex:1,
        width:'100%'
    },
    scrollViewContent:{
        justifyContent:'center',
        alignContent:'center'
    }
})