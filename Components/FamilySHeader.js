import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity
} from "react-native";
import React from "react";


export default function FamilySHeader(props){
    return(
        <View style={styles.container}>
            <View style={[styles.containerT]}>
                <TouchableOpacity style={styles.button} onPress={()=>{props.navigation.goBack();}}>
                    <Image style={styles.icon} source={require('../Icons/back.png')}></Image>
                </TouchableOpacity>
                <Text style={{fontSize:20,marginLeft:10,fontWeight:'bold'}}>Family</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>{props.navigation.navigate("AddChild");}}>
                <Image style={styles.icon} source={require('../Icons/add.png')}></Image>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:0.1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:60,
        width:'100%',
        paddingHorizontal:10,
        shadowColor:'black',
        shadowOpacity:0.3,
        elevation:3,
        shadowOffset:{width:-10,height:-10},
        shadowRadius:30
    },
    containerT:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        height:60,
        width:'100%',
    },
    button:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        width:40,
        height:40
    },
    icon:{
        width:30,
        height:30,
        resizeMode:'contain'
    }
});