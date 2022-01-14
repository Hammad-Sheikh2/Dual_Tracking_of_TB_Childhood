import { Text, View, Image} from 'react-native';
import React from 'react';

export default function Symptom(props) {
    return (
      <View
        style={{
          flexDirection:'column',
          alignItems:'center',
          width:50,
          height:80
      }}>
        <View style={{
          width:50,
          height:50,
          borderRadius:50,
          borderWidth:1,
          backgroundColor:'white',
          position:'relative',
          top:10
        }}>
          <Image 
            style={{
              width:50,
              height:50,
              borderRadius:50/2
            }}
            source={{uri: 'https://imagizer.imageshack.com/img924/9084/H33H0z.jpg'}}
          />
        </View>

        <View style={{
          width:20,
          height:20,
          borderRadius:20,
          borderWidth:1,
          backgroundColor:'yellow',
          position:'relative',
          top:-50,
          left:15
        }}>
        </View>
        <Text style={{
          color:'white',
          position:'relative',
          top:-10
          }}>{props.symptomText}</Text>
      </View>
    );
  }