import { 
    View ,
    StyleSheet,
    ImageBackground,
    Text,
    TouchableOpacity
} from "react-native";
import React from "react";

export default function ChildIcon(props){
    return(
        <TouchableOpacity style={styles.container} onPress={()=>{props.navigation.navigate('Questionnaire')}}>
            <ImageBackground style={styles.imageBackground} source={require("../Icons/childLogo.jpg")} resizeMode={"stretch"} >
                <View style={[styles.container,{padding:10}]}>
                    <View style={styles.hBox}>
                        <Text style={styles.text}>Male</Text>
                        <TouchableOpacity style={styles.editButton}><Text style={styles.text}>Edit Details</Text></TouchableOpacity>
                    </View>
                    <View style={[styles.hBox,{alignItems:'flex-end'}]}>
                        <Text style={[styles.text,{fontSize:25}]}>NAME</Text>
                        <Text style={[styles.text,styles.inProgress]}>{/*Today's questions answered or not?*/}In Progress</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    imageBackground:{
        height:300
    },
    text:{
        color:'white',
        fontWeight:'bold',
        fontSize:15
    },
    hBox:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    inProgress:{
        backgroundColor:'yellow',
        padding:10,
        paddingHorizontal:20,
        borderRadius:10,
        color:'red',
        shadowOpacity:40,
        shadowOffset: {width: 10,height: 10},
        shadowColor:'black',
        elevation:20,
    },
    editButton:{
        backgroundColor:'#000018',
        padding:10,
        paddingHorizontal:20,
        borderRadius:10,
        height:40
    }
});