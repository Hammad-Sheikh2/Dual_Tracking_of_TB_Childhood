import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import React , { useState } from 'react';


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
          borderStyle:'solid',
          marginTop:40,
          paddingHorizontal:30,
          paddingVertical:10,
          width:'100%'
        }}>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>
          
        </View>
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
          borderStyle:'solid',
          borderWidth:1,
          paddingHorizontal:50,
          paddingVertical:10,
          borderRadius:50,
          backgroundColor:'green'
        }}>
          <Text style={{fontSize:24}}>Horizontal Equalizer</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
