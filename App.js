import { SafeAreaView, StyleSheet, Text, View, Image, Button, Animated, Easing, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import React , { useState } from 'react';
import Symptom from './Components/Symptom.js';
import { data } from './Data.js';
const {width,height} = Dimensions.get('window')

export default function App() {
  const [Item, setItem] = useState(data[0]);
  const [swipe,setSwipe] = useState(new Animated.Value(0))
  const [rotationAntiClockwise,setRotationAntiClockwise]=useState(new Animated.Value(0.5))
  const [fade,setFade]= useState(new Animated.Value(1))
  let rotateData = rotationAntiClockwise.interpolate({
    inputRange:[0,1],
    outputRange:["0deg","360deg"]
  })
  let isSwipeDown = true;
  let BottomBarContent = [];
  //* Adding Bottom Bar Content
  for (let index = 0; index < parseInt(data.length/4)  + (data.length%4===0?0:1); index++) {
    let rowContent = []
    for (let i = 0; i < (index===parseInt(data.length/4) + (data.length%4===0?0:1)-1?data.length%4:4) ; i++) {
      rowContent.push(<Symptom data={data[index*4+i]} setter={setItem} />)
    }
    let row = <View style={styles.BottomBarRow}>{rowContent}</View>
    BottomBarContent.push(row)
  }
  const animateViewSwipe=()=>{
    if (isSwipeDown) {
      animateViewSwipeUp()
      isSwipeDown = false;
    }
    else{
      animateViewSwipeDown()
      isSwipeDown = true;
    }
  }
  const animationFadeOut = ()=>{
    Animated.timing(fade,{
      toValue:0,
      duration:1000,
      easing:Easing.linear,
      useNativeDriver:false
    }).start();
  }
  const animationFadeIn = ()=>{
    Animated.timing(fade,{
      toValue:1,
      duration:1000,
      easing:Easing.linear,
      useNativeDriver:false
    }).start();
  }
  const animationRotateAntiClockwise = ()=>{
    Animated.timing(rotationAntiClockwise,{
      toValue:0,
      duration:500,
      easing:Easing.linear,
      useNativeDriver:false
    }).start();
  }
  const animationRotateClockwise = ()=>{
    Animated.timing(rotationAntiClockwise,{
      toValue:0.5,
      duration:500,
      easing:Easing.linear,
      useNativeDriver:false
    }).start();
  }
  const animateViewSwipeDown = ()=>{
    animationFadeIn();
    Animated.timing(swipe,{
      toValue:0,
      duration:1000,
      useNativeDriver:true
    }).start(()=>{animationRotateClockwise()});
  }
  const animateViewSwipeUp = ()=>{
    animationFadeOut();
    Animated.timing(swipe,{
      toValue:-300,
      duration:1000,
      useNativeDriver:true
    }).start(()=>{animationRotateAntiClockwise()});
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} />
      <View style={styles.TopBar}>
        <TouchableOpacity><Image style={{width:20,height:20}} source={require('./Icons/translate.png')}/></TouchableOpacity>
        <TouchableOpacity><Image style={{width:20,height:20}} source={require('./Icons/sound.png')}/></TouchableOpacity>
      </View>
      <View style={styles.QuestionView}>
        <Text style={{fontSize:18}}>{Item.Question.English}</Text>
      </View>
      <Animated.View style={{opacity:fade}}>
        <Image
          style={styles.SymptomAnimation}
          resizeMode='contain'
          source={
            Item.Animation
          }
        />
      </Animated.View>
      <Animated.View style={{transform:[{translateY:swipe}]}}>
        <View style={styles.EqualizerView}>
          <Text style={{fontSize:24}}>Horizontal Equalizer</Text>
        </View>
      </Animated.View>
      <Animated.View style={{width:'100%',height:600,transform:[{translateY:swipe}]}}>
        <View style={styles.BottomBar}>
          <View style={styles.BottomBarRow}>
            <View onStartShouldSetResponder={()=>{animateViewSwipe()}}>
              <Animated.Image 
                style = {{width:20,height:20,transform:[{rotate:rotateData}]}}
                source={require("./Icons/dropImage.png")}
                />
            </View>
          </View>
          {BottomBarContent}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center'
  },
  TopBar:{
    paddingHorizontal:20,
    paddingVertical:10,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#000018'
  },
  QuestionView:{
    borderStyle:'solid',
    borderWidth:1,
    marginTop:20,
    paddingHorizontal:30,
    paddingVertical:10,
    borderRadius:50
  },
  SymptomAnimation:{
    marginTop:50,
    width: 300,
    height: 300,
    borderRadius: 300
  },
  EqualizerView:{
    margin:25,
    paddingHorizontal:50,
    paddingVertical:10,
    borderRadius:50,
    backgroundColor:'green'
  },
  BottomBar:{
    backgroundColor:'#000018',
    marginTop:30,
    width:'100%',
    flex:1,
    borderTopLeftRadius:50,
    borderTopEndRadius:50
  },
  BottomBarRow:{
    marginTop:20,
    flexDirection: 'row',
    justifyContent:'center',
    paddingHorizontal:30
  }
});