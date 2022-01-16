import { SafeAreaView, StyleSheet, Text, View, Image, Button, Animated } from 'react-native';
import React , { useState , useRef, useEffect } from 'react';
import Symptom from './Components/Symptom';
import { data } from './Data';

export default function App() {
  const [Item, setItem] = useState(data[0]);
  const [swipeUp,setSwipeUp] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(swipeUp,{
      toValue:-300,
      useNativeDriver:true
    }).start();
  },[swipeUp])

  return (
    <SafeAreaView style={{alignItems:'center'}}>
      <View style={
        {
          paddingHorizontal:20,
          paddingVertical:10,
          width:'100%',
          flexDirection:'row',
          justifyContent:'space-between',
          backgroundColor:'#000018'
        }}>
        <Button
            title='Play Question'
            color="#32AAB9"
            accessibilityLabel="Learn more about this purple button"
          />
        <Button
          title='Translate'
          color="#32AAB9"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      <View style={
        {
          borderStyle:'solid',
          borderWidth:1,
          marginTop:20,
          paddingHorizontal:30,
          paddingVertical:10,
          borderRadius:50
        }}>
        <Text style={{fontSize:18}}>{Item.Question.Urdu}</Text>
      </View>
      <View>
        <Image
          style={{
            marginTop:60,
            width: 300,
            height: 300,
            borderRadius: 300,
          }}
          resizeMode='contain'
          source={
            Item.Animation
          }
        />
      </View>
      <View style={
        {
          margin:25,
          paddingHorizontal:50,
          paddingVertical:10,
          borderRadius:50,
          backgroundColor:'green'
        }}>
          <Text style={{fontSize:24}}>Horizontal Equalizer</Text>
      </View>
      <View style={{
        backgroundColor:'#000018',
        marginTop:50,
        width:'100%',
        height:400,
        borderTopLeftRadius:50,
        borderTopEndRadius:50,
        transform:[{translateX:swipeUp}]
      }}>
        <View
          style={{
            marginTop:15,
            flexDirection: 'row',
            justifyContent:'space-around',
            paddingHorizontal:30
          }}
        >
          <View>
            <Image 
              style = {{width:20,height:20,transform:[{rotate:'180deg'}]}}
              source={require("./Icons/dropImage.png")}
            />
          </View>
        </View>
        <View
          style={{
            marginTop:15,
            flexDirection: 'row',
            justifyContent:'space-around',
            paddingHorizontal:30
          }}
        >
          <Symptom symptomText={data[0].Name} icon={data[0].Icon} data={data[0]} setter={setItem} />
          <Symptom symptomText={data[1].Name} icon={data[1].Icon} data={data[1]} setter={setItem} />
          <Symptom symptomText={data[2].Name} icon={data[2].Icon} data={data[2]} setter={setItem} />
          <Symptom symptomText={data[3].Name} icon={data[3].Icon} data={data[3]} setter={setItem} />
        </View>
        <View
          style={{
            marginTop:20,
            flexDirection: 'row',
            justifyContent:'space-around',
            paddingHorizontal:30
          }}
        >
          <Symptom symptomText={data[4].Name} icon={data[4].Icon} data={data[4]} setter={setItem} />
          <Symptom symptomText={data[5].Name} icon={data[5].Icon} data={data[5]} setter={setItem} />
          <Symptom symptomText={data[6].Name} icon={data[6].Icon} data={data[6]} setter={setItem} />
          <Symptom symptomText={data[7].Name} icon={data[7].Icon} data={data[7]} setter={setItem} />
        </View>
        <View
          style={{
            marginTop:20,
            flexDirection: 'row',
            justifyContent:'space-around',
            paddingHorizontal:100
          }}
        >
          <Symptom symptomText={data[8].Name} icon={data[8].Icon} data={data[8]} setter={setItem} />
          <Symptom symptomText={data[9].Name} icon={data[9].Icon} data={data[9]} setter={setItem} />
        </View>
      </View>
    </SafeAreaView>
  );
}