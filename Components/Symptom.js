import { Text, View, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function Symptom(props) {
    return (
      <View
        style={styles.container}>
        <View style={styles.IconView}>
          <Image 
            style={styles.IconImage}
            source={require("."+props.icon)}
          />
        </View>
        <View style={styles.ValueView}></View>
        <Text style={styles.Text}>{props.symptomText}</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container:{
      flexDirection:'column',
      alignItems:'center',
      width:50,
      height:80
    },
    IconView:{
      width:50,
      height:50,
      borderRadius:50,
      borderWidth:1,
      backgroundColor:'white',
      position:'relative',
      top:10
    },
    IconImage:{
      width:50,
      height:50,
      borderRadius:50/2
    },
    ValueView:{
      width:20,
      height:20,
      borderRadius:20,
      borderWidth:1,
      backgroundColor:'yellow',
      position:'relative',
      top:-50,
      left:15
    },
    Text:{
      color:'white',
      position:'relative',
      top:-10
    }
  })