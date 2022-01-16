import { SafeAreaView, StyleSheet, Text, View, Image, Button, Touchable } from 'react-native';
import React , { useState } from 'react';
import Symptom from './Components/Symptom';
import { data } from './Data';

export default function App() {
  const [Item, setItem] = useState(data[0]);
  console.log(data[0])
  alert(data[0])
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
        <Text style={{fontSize:18}}>{Item.Question.Urdu}</Text>
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
            require(""+Item.Animation)
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
          <Touchable>
            <Image 
              style = {{width:40,height:30,transform:[{rotate:'180deg'}]}}
              source={require("./LottieFilesGIFs/dry-cough.gif")} 
            />
          </Touchable>
        </View>
        <View
          style={{
            marginTop:15,
            flexDirection: 'row',
            justifyContent:'space-around',
            paddingHorizontal:30
          }}
        >
          <Symptom symptomText={data[0].Name} icon={data[0].Icon} />
          <Symptom symptomText={data[1].Name} icon={data[1].Icon} />
          <Symptom symptomText={data[2].Name} icon={data[2].Icon} />
          <Symptom symptomText={data[3].Name} icon={data[3].Icon} />
        </View>
        <View
          style={{
            marginTop:20,
            flexDirection: 'row',
            justifyContent:'space-around',
            paddingHorizontal:30
          }}
        >
          <Symptom symptomText={data[4].Name} icon={data[4].Icon} />
          <Symptom symptomText={data[5].Name} icon={data[5].Icon} />
          <Symptom symptomText={data[6].Name} icon={data[6].Icon} />
          <Symptom symptomText={data[7].Name} icon={data[7].Icon} />
        </View>
        <View
          style={{
            marginTop:20,
            flexDirection: 'row',
            justifyContent:'space-around',
            paddingHorizontal:100
          }}
        >
          <Symptom symptomText={data[8].Name} icon={data[8].Icon} />
          <Symptom symptomText={data[9].Name} icon={data[9].Icon} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    
  }
})