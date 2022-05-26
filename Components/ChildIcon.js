import { 
    View ,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from "react-native";
import React from "react";
const colors = ['red','#00ff00','purple','gray','black','orange','pink']


export default function ChildIcon(props){
    return(
        <TouchableOpacity style={styles.container} onPress={()=>{props.navigation.navigate('Questionnaire',{childId:props.child.id,userId:props.userId})}}>
            <View style={[styles.container,{borderRadius:30,backgroundColor:colors[Math.floor(Math.random() * 1000)%7]}]}>
                <View style={styles.hBox}>
                    <View>
                        <Text style={[styles.text,{fontSize:30}]}>{props.child.name}</Text> 
                        <Text style={styles.text}>{new Date(new Date() - new Date(props.child.dob)).getFullYear() - 1970} years old</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={()=>{
                        props.navigation.navigate("AddChild",{name:props.child.name,dob:new Date(props.child.dob),gender:props.child.gender,userId:props.userId});
                    }}><Image style={styles.genderIcon} source={require('../Icons/edit.png')}></Image></TouchableOpacity>
                    
                </View>
                <View style={[styles.hBox,{alignItems:'flex-end'}]}>
                    <Image style={styles.genderIcon} source={(props.child.gender==="MALE"?require('../Icons/male.png'):require('../Icons/female.png'))}></Image>
                    <Text style={[styles.text,styles.inProgress]}>{/*Today's questions answered or not?*/}In Progress</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:300,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
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