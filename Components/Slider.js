import { StyleSheet, Text, View, Animated, TouchableOpacity, Easing } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
const COLORS = [
  '#0f0',
  '#fa0',
  '#f00'
]
export default function Slider(props) {
  const [lift,setLift]= useState(0);
  const [size,setSize]= useState(CIRCLE_PICKER_SIZE/2);
  let sliderEachPointValue=[]
  for (let index = 0; index < 11; index++) {
    sliderEachPointValue.push(<Text key={index.toString()} style={{color:'white',fontWeight:'bold'}}>{index}</Text>)
  }
  const translatePickerOnScale=(e)=>{
    if(e.nativeEvent.pageX<80||e.nativeEvent.pageX>330)
      return;
    props.setTranslation(e.nativeEvent.pageX-88);
    props.setValue(parseInt((e.nativeEvent.pageX-80)/(330-80)*11))
  }
  
  return (
      <View style={styles.container}>
        <LinearGradient 
          colors={COLORS} 
          start={{x:0,y:0}}
          end={{x:1,y:0}}
          style={styles.scale}
        >
          <View style={styles.scaleInside}>
            {sliderEachPointValue}
          </View>
        </LinearGradient>
        <Animated.View 
          style={{
            position:'absolute',
            left:0,
            width:CIRCLE_PICKER_SIZE,
            height:CIRCLE_PICKER_SIZE,
            borderRadius:CIRCLE_PICKER_SIZE/2,
            backgroundColor:'white',
            borderWidth:3,
            borderColor:'rgba(0,0,0,0.1)',
            justifyContent:'center',
            alignItems:'center',
            transform:[{translateX:props.Translation}]
          }}
          onTouchStart={()=>{setLift(-50);setSize(CIRCLE_PICKER_SIZE)}}
          onTouchMove={ e => translatePickerOnScale(e) }
          onTouchEnd={e=>{props.onSlidingEnd();setLift(0);;setSize(CIRCLE_PICKER_SIZE/2)}}
          >
          <Animated.View style={{
            width:size,
            height:size,
            borderRadius:size/2,
            elevation:10,
            shadowColor:'black',
            shadowOffset:{width:5,height:5},
            shadowOpacity:0.5,
            shadowRadius:CIRCLE_PICKER_SIZE/4,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'black',
            transform:[{translateY:lift}]
          }}>
            <Text key={'value'} style={{fontWeight:'bold',color:'white'}}>{props.value}</Text>
          </Animated.View>
        </Animated.View>
      </View>
  );
}

const CIRCLE_PICKER_SIZE=45;
const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
    alignItems:'center',
    height:35,
    width:'90%'
  },
  scale:{
    flex:1,
    borderRadius:20
  },
  scaleInside:{
    justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'row',
    flex:1
  }
});
