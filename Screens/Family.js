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
import React, { useState } from "react";
import { Link } from "@react-navigation/native";
import ChildIcon from "../Components/ChildIcon";
import FamilySHeader from "../Components/FamilySHeader";


export default function Family(props){
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={false} />
            <FamilySHeader navigation={props.navigation}></FamilySHeader>
            <ScrollView style={styles.scrollView} centerContent={true} bounces={true}>
                <ChildIcon navigation={props.navigation}></ChildIcon>
                <ChildIcon navigation={props.navigation}></ChildIcon>
                <ChildIcon navigation={props.navigation}></ChildIcon>
                <ChildIcon navigation={props.navigation}></ChildIcon>
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