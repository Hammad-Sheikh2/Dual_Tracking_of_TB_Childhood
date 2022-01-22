import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
const COLORS = [
  '#0f0',
  '#fa0',
  '#f00'
]
export default function Slider(props) {
  let sliderEachPointValue=[]
  for (let index = 0; index < 11; index++) {
    sliderEachPointValue.push(<Text style={{color:'white',fontWeight:'bold'}}>{index}</Text>)
  }
  const translatePickerOnScale=(e)=>{
    if (e.touchX-e.nativeEvent.pageX>20){
        //? Swipe Left
        if(props.Translation<=0){
            return;
        }
        props.setTranslation(props.Translation-4)
    }
    if (e.touchX-e.nativeEvent.pageX<-20){
        //? Swipe Right
        if(props.Translation>=240){
            return;
        }
        props.setTranslation(props.Translation+4)
    }
    props.setValue(parseInt(props.Translation/(245/11)))
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
          onTouchStart = { e => {e.touchX = e.nativeEvent.pageX} }
          onTouchMove={ e => translatePickerOnScale(e) }
          onTouchEnd={e=>{props.onSlidingEnd()}}
          >
          <View style={styles.pickerInsider}>
            <Text style={{fontWeight:'bold',color:'white'}}>{props.value}</Text>
          </View>
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
  pickerInsider:{
    width:CIRCLE_PICKER_SIZE/2,
    height:CIRCLE_PICKER_SIZE/2,
    borderRadius:CIRCLE_PICKER_SIZE/4,
    elevation:10,
    shadowColor:'black',
    shadowOffset:{width:5,height:5},
    shadowOpacity:0.5,
    shadowRadius:CIRCLE_PICKER_SIZE/4,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black'
  },
  scaleInside:{
    justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'row',
    flex:1
  }
});
