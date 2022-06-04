import { 
    View ,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Alert
} from "react-native";
import React, {useState,useEffect} from "react";
const colors = ['red','#00ff00','purple','gray','black','orange','pink']


export default function ChildIcon(props){
    const [status,setStatus] = useState("");
    useEffect(()=>{
        let count = props.Questionnaires.filter(e => e.Value!=null).length;
        setStatus(`${count} question(s) answered / ${props.Questionnaires.length}`);
    },[])
    return(
        <TouchableOpacity style={styles.container} onPress={()=>{
            props.navigation.navigate('Questionnaire',{childId:props.child.id,userId:props.userId,Questionnaires:props.Questionnaires,navigation:props.navigation})
        }}>
            <View style={[styles.container,{padding:20,borderRadius:30,backgroundColor:colors[props.child.id%7]}]}>
                <View style={styles.hBox}>
                    <View>
                        <Text style={[styles.text,{fontSize:30}]}>{props.child.name}</Text> 
                        <Text style={styles.text}>{new Date(new Date() - new Date(props.child.dob)).getFullYear() - 1970} years old</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={()=>{
                        props.navigation.navigate("AddChild",{id:props.child.id,name:props.child.name,dob:new Date(props.child.dob),gender:props.child.gender,userId:props.userId,navigation:props.navigation});
                    }}><Image style={styles.genderIcon} source={require('../Icons/edit.png')}></Image></TouchableOpacity>
                    
                </View>
                <View style={[styles.hBox,{alignItems:'flex-end'}]}>
                    <Image style={styles.genderIcon} source={(props.child.gender==="MALE"?require('../Icons/male.png'):require('../Icons/female.png'))}></Image>
                    <Text style={[styles.text,styles.inProgress]}>{status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:200,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
    },
    text:{
        color:'white',
        fontWeight:'bold',
        fontSize:15
    },
    hBox:{
        flex:1,
        width:'100%',
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
        shadowOffset: {width: 5,height: 5},
        shadowColor:'black',
        elevation:5,
    },
    completed:{
        backgroundColor:'green',
        padding:10,
        paddingHorizontal:20,
        borderRadius:10,
        color:'white',
        shadowOpacity:40,
        shadowOffset: {width: 5,height: 5},
        shadowColor:'black',
        elevation:5,
    },
    editButton:{
        backgroundColor:'#000018',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        width:30,
        height:30
    },
    genderIcon:{
        height:30,
        width:30,
        resizeMode:'contain',
    }
});