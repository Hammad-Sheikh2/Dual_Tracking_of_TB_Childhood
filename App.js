import { SafeAreaView, StyleSheet, Text, View, Image, Button, Pressable } from 'react-native';
import React , { useState } from 'react';
import Symptom from './Components/Symptom';

export default function App() {
  const [question, setQuestion] = useState("How serve was your cough?");
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <View style={
        {
          marginTop:40,
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
        <Text style={{fontSize:18}}>{question}</Text>
      </View>
      <View>
        <Image
          style={{
            marginTop:60,
            width: 300,
            height: 300,
            borderRadius: 300,
            backgroundColor:'blue'
          }}
          source={
            require('./LottieFilesGIFs/dry-cough.gif')
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
        
      }}>
        <View
          style={{
            marginTop:15,
            flexDirection: 'row',
            justifyContent:'space-around',
            paddingHorizontal:30
          }}
        >
          <Pressable>
            <Image 
              style = {{width:40,height:30,transform:[{rotate:'180deg'}]}}
              source={require("./LottieFilesGIFs/dry-cough.gif")} 
            />
          </Pressable>
        </View>
        <View
          style={{
            marginTop:15,
            flexDirection: 'row',
            justifyContent:'space-around',
            paddingHorizontal:30
          }}
        >
          <Symptom symptomText='Cough' />
          <Symptom symptomText='Fever' />
          <Symptom symptomText='Sweat' />
          <Symptom symptomText='Cooking' />
        </View>
        <View
          style={{
            marginTop:20,
            flexDirection: 'row',
            justifyContent:'space-around',
            paddingHorizontal:30
          }}
        >
          <Symptom symptomText='Anxiety' />
          <Symptom symptomText='Sleep' />
          <Symptom symptomText='SHS' />
          <Symptom symptomText='Care' />
        </View>
        <View
          style={{
            marginTop:20,
            flexDirection: 'row',
            justifyContent:'space-around',
            paddingHorizontal:100
          }}
        >
          <Symptom symptomText="Playfulness" />
          <Symptom symptomText='Pollution' />
        </View>
      </View>
    </SafeAreaView>
  );
}