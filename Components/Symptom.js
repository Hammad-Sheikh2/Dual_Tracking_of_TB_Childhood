import { Text, View, Image, StyleSheet} from 'react-native';
import React from 'react';
let top=0;
export default function Symptom(props) {
    top=props.data.Value!==null?-20:0
    return (
      <View onStartShouldSetResponder={()=>{props.setTranslation((props.data.Value===null||props.data.Value===0)?0:(props.data.Value*(245/11)+5));props.setSliderValue(props.data.Value===null?0:props.data.Value);props.setCurrentDataItem(props.currentDataItem);props.setter(props.data)}}
        style={styles.container}>
        <View style={styles.IconView}>
          <Image 
            style={styles.IconImage}
            source={props.data.Icon}
          />
        </View>
        {props.data.Value!==null?
          <View style={styles.ValueView}>
            <Text style={{fontWeight:'bold'}}>{props.data.Value}</Text>
          </View>:<></>
        }
        <Text style={{textAlign:'center',color:'white',top:top}}>{props.data.Name}</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container:{
      flexDirection:'column',
      alignItems:'center',
      width:50,
      height:80,
      marginHorizontal:10,
    },
    IconView:{
      width:50,
      height:50,
      borderRadius:50,
      backgroundColor:'white',
      position:'relative',
      justifyContent:'center',
      alignItems:'center',
      marginTop:10
    },
    IconImage:{
      width:40,
      height:40,
      borderRadius:40/2
    },
    ValueView:{
      width:20,
      height:20,
      borderRadius:20,
      borderWidth:1,
      backgroundColor:'yellow',
      position:'relative',
      top:-50,
      left:15,
      justifyContent:'center',
      alignItems:'center'
    }
  })