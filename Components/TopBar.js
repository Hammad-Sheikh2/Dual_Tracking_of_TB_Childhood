import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Languages } from "../Data";
import { Audio } from "expo-av";
export default TopBar = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [disabler, setDisabler] = useState(false);
  const getAudioAccordingToSelectedLanguage = () => {
    if (props.Language === "English") {
      return props.Audio.English;
    }
    if (props.Language === "اُردُو") {
      return props.Audio.Urdu;
    }
  };
  const PlaySound = async () => {
    setDisabler(true);
    const { sound } = await Audio.Sound.createAsync(
      getAudioAccordingToSelectedLanguage()
    );
    await sound.playAsync().then(() => {
      setDisabler(false);
    });
  };
  let languages = [];
  for (let index = 0; index < Languages.length; index++) {
    languages.push(
      <TouchableOpacity
        style={styles.LanguagesButton}
        onPress={() => {
          props.ChangeLanguage(Languages[index]);
          setModalVisible(!modalVisible);
        }}
      >
        <Text style={{ color: "white" }}>{Languages[index]}</Text>
      </TouchableOpacity>
    );
  }
  return (
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
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                paddingHorizontal: 50,
                paddingVertical: 5,
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{ color: "white" }}>Close Translator </Text>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../Icons/close.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalView}>{languages}</View>
        </View>
      </Modal>
      <View style={styles.TopBar}>
        <TouchableOpacity
          style={{flexDirection:'row',borderColor:'white',borderRadius:30,borderWidth:1,paddingHorizontal:5,paddingVertical:1}}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../Icons/translate.png")}
          />
          <Text style={{color:'white',paddingLeft:10}}>{props.Language}</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={disabler} onPress={() => PlaySound()}>
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../Icons/sound.png")}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  TopBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000018",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 60,
  },
  LanguagesButton: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "#32AAB9",
    borderRadius: 50,
  },
  closeButton: {
    flexDirection: "row",
    backgroundColor: "black",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 60,
  },
});
