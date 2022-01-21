import {  StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native';
import React , { useState } from 'react';
import { Languages } from '../Data';

export default TopBar=(props)=>{
    const [modalVisible, setModalVisible] = useState(false);
    let languages=[]
    for (let index = 0; index < Languages.length; index++) {
        languages.push(<TouchableOpacity style={styles.LanguagesButton} onPress={()=>{props.ChangeLanguage(Languages[index]);setModalVisible(!modalVisible);}}><Text>{Languages[index]}</Text></TouchableOpacity>)
    }
    return(
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.closeButton}>
                    <TouchableOpacity style={{alignSelf:'flex-end',paddingHorizontal:80,paddingVertical:5}} onPress={()=>setModalVisible(!modalVisible)}>
                        <Image style={{width:20,height:20}} source={require('../Icons/close.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    {languages}
                </View>
            </View>
        </Modal>
        <View style={styles.TopBar}>
            <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}}><Image style={{width:20,height:20}} source={require('../Icons/translate.png')}/></TouchableOpacity>
            <TouchableOpacity><Image style={{width:20,height:20}} source={require('../Icons/sound.png')}/></TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    TopBar:{
        paddingHorizontal:20,
        paddingVertical:10,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#000018'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        justifyContent:'space-evenly',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 20
        },
        shadowOpacity: 0.50,
        shadowRadius: 10,
        elevation: 60
      },
      LanguagesButton:{
        marginVertical:10,
        paddingVertical:10,
        paddingHorizontal:50,
        backgroundColor:'skyblue',
        borderRadius:50
      },
      closeButton:{
        flexDirection:'row',
        backgroundColor:'gray',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 20
        },
        shadowOpacity: 0.50,
        shadowRadius: 10,
        elevation: 60
      }
})