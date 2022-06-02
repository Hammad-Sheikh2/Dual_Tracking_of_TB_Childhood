import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Easing,
    Dimensions,
    StatusBar,
    Alert,
    TouchableOpacity
  } from "react-native";
  import React, { useState } from "react";
  import Slider from "../Components/Slider";
  import Symptom from "../Components/Symptom.js";
  import TopBar from "../Components/TopBar.js";
  import { openDatabase } from 'expo-sqlite';
  import { route } from "../assets/route";
  const db = openDatabase('db.DualTracking')
  const { width } = Dimensions.get("window");
  let isCompletionMessageShowed = false;
  var index = 0;
  var nextIndex = 1;
  export default function Questionnaire(props) {
    const [Item, setItem] = useState(props.route.params.Questionnaires[0]);
    const [language, setLanguage] = useState("English");
    const [swipe, setSwipe] = useState(new Animated.Value(0));
    const [rotationAntiClockwise, setRotationAntiClockwise] = useState(
      new Animated.Value(0.5)
    );
    const [fade, setFade] = useState(new Animated.Value(1));
    const [currentDataItem, setCurrentDataItem] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const [translation, setTranslation] = useState(sliderValue * (width/10));
    let rotateData = rotationAntiClockwise.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
    const SetValue = () => {
      if (props.route.params.Questionnaires[currentDataItem].Value!=null) {
        db.transaction(function(txn) {
          var query = `Update Responses Set value = ${sliderValue} where id = ${props.route.params.Questionnaires[currentDataItem].responseId};`
          txn.executeSql(
              query, //Query to execute as prepared statement
              [],  
              function(tx, res) {console.log("Updated Response",res);},  //Callback function to handle the result
              (txObj, error) => console.log('Error', error)
          );
        });
      }
      else{
        db.transaction(function(txn) {
          var query = "INSERT into Responses(childId,questionId,value,date,isSent) VALUES(?,?,?,?,?);"
          txn.executeSql(
              query, //Query to execute as prepared statement
              [props.route.params.childId, Item.id, Item.Value, new Date().toDateString(),false],  
              function(tx, res) {
                console.log("Inserted Response",res);
                props.route.params.Questionnaires[currentDataItem].responseId = res.insertId;
              },  //Callback function to handle the result
              (txObj, error) => console.log('Error', error)
          );
        });
      }
      props.route.params.Questionnaires[currentDataItem].Value = sliderValue;
      if (!isCompletionMessageShowed) {
        let isUnAnsweredQuestionRemain = false;
        for (let index = 0; index < props.route.params.Questionnaires.length; index++) {
          if (props.route.params.Questionnaires[index].Value === null) {
            isUnAnsweredQuestionRemain = true;
            nextIndex = index;
            index = props.route.params.Questionnaires.length;
          }
        }
        if (!isUnAnsweredQuestionRemain) {
          isCompletionMessageShowed = true;
          setItem(props.route.params.Questionnaires[0]);
          setSliderValue(props.route.params.Questionnaires[0].Value === null ? 0 : props.route.params.Questionnaires[0].Value);
          setCurrentDataItem(0);
          setTranslation(props.route.params.Questionnaires[0].Value * (245/10));
          nextIndex = 1;
          Alert.alert("All Done!!", "You have answered all today's question.", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("Ok Pressed") },
          ]);
          return;
        }
        if (currentDataItem >= props.route.params.Questionnaires.length - 1) {
          return;
        }
        var currentItem = props.route.params.Questionnaires[index];
        var nextItem = props.route.params.Questionnaires[nextIndex];
        props.route.params.Questionnaires[nextIndex] = currentItem;
        props.route.params.Questionnaires[index] = nextItem;
        setItem(props.route.params.Questionnaires[index]);
        setSliderValue(props.route.params.Questionnaires[index].Value === null ? 0 : props.route.params.Questionnaires[index].Value);
        setCurrentDataItem(index);
        setTranslation(props.route.params.Questionnaires[index].Value * (245/10));
      }
      else{
        setItem(props.route.params.Questionnaires[currentDataItem]);
        setTranslation(props.route.params.Questionnaires[currentDataItem].Value * (245/10));
      }
    };
    const GetQuestion = (Language) => {
      switch (Language) {
        case "English":
          return Item.Question.English;
        case "اُردُو":
          return Item.Question.Urdu;
      }
    };
    let isSwipeDown = true;
    let BottomBarContent = [];
    //* Adding Bottom Bar Content
    for (
      let index = 0;
      index < parseInt(props.route.params.Questionnaires.length / 4) + (props.route.params.Questionnaires.length % 4 === 0 ? 0 : 1);
      index++
    ) {
      let rowContent = [];
      for (
        let i = 0;
        i <
        (index === parseInt(props.route.params.Questionnaires.length / 4) + (props.route.params.Questionnaires.length % 4 === 0 ? 0 : 1) - 1
          ? props.route.params.Questionnaires.length % 4
          : 4);
        i++
      ) {
        rowContent.push(
          <Symptom
            setSliderValue={setSliderValue}
            currentDataItem={index * 4 + i}
            setCurrentDataItem={setCurrentDataItem}
            data={props.route.params.Questionnaires[index * 4 + i]}
            setter={setItem}
            setTranslation = {setTranslation}
          />
        );
      }
      let row = <View style={styles.BottomBarRow}>{rowContent}</View>;
      BottomBarContent.push(row);
    }
    //* Animations
    const animateViewSwipe = () => {
      if (isSwipeDown) {
        animateViewSwipeUp();
        isSwipeDown = false;
      } else {
        animateViewSwipeDown();
        isSwipeDown = true;
      }
    };
    const animationFadeOut = () => {
      Animated.timing(fade, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    };
    const animationFadeIn = () => {
      Animated.timing(fade, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    };
    const animationRotateAntiClockwise = () => {
      Animated.timing(rotationAntiClockwise, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    };
    const animationRotateClockwise = () => {
      Animated.timing(rotationAntiClockwise, {
        toValue: 0.5,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    };
    const animateViewSwipeDown = () => {
      animationFadeIn();
      Animated.timing(swipe, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        animationRotateClockwise();
      });
    };
    const animateViewSwipeUp = () => {
      animationFadeOut();
      Animated.timing(swipe, {
        toValue: -300,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        animationRotateAntiClockwise();
      });
    };
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={false} />
        <TopBar
          ChangeLanguage={setLanguage}
          Language={language}
          Audio={Item.Audio}
        />
        <View style={styles.QuestionView}>
          <Text style={{ fontSize: 18 }}>{GetQuestion(language)}</Text>
        </View>
        <Animated.View
          style={{
            opacity: fade,
            borderColor: "black",
            borderWidth: 1,
            marginTop: 20,
          }}
        >
          <Image
            style={styles.SymptomAnimation}
            resizeMode="contain"
            source={Item.Animation}
          />
        </Animated.View>
        <Animated.View
          style={{ width: "100%", transform: [{ translateY: swipe }] }}
        >
          <View style={styles.EqualizerView}>
            <Slider
              value={sliderValue}
              setValue={setSliderValue}
              onSlidingEnd={SetValue}
              translation = {translation}
              setTranslation = {setTranslation}
              mildLabel = {Item.MildLabel}
              severeLabel = {Item.SevereLabel}
            />
          </View>
          {
          isCompletionMessageShowed?
            <TouchableOpacity style={{alignItems: "center",marginHorizontal:100,borderRadius:30,borderWidth:2,padding:10}}  onPress={()=>{
              Alert.alert("All Done!!", "Data is submitted.", [
                { text: "OK", onPress: () => {props.route.params.navigation.goBack()}},
              ]);
            }}><Text style={{fontWeight:"bold"}}>Submit</Text></TouchableOpacity>:
            <React.Fragment></React.Fragment>
          }
        </Animated.View>
        <Animated.View
          style={{
            width: "100%",
            height: 800,
            transform: [{ translateY: swipe }],
          }}
        >
          <View style={styles.BottomBar}>
            <View style={styles.BottomBarRow}>
              <TouchableOpacity
                onPress = {() => {
                  animateViewSwipe();
                }}
              >
                <Animated.Image
                  style={{
                    width: 20,
                    height: 20,
                    transform: [{ rotate: rotateData }],
                  }}
                  source={require("../Icons/dropImage.png")}
                />
              </TouchableOpacity>
            </View>
            {BottomBarContent}
          </View>
        </Animated.View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    QuestionView: {
      borderStyle: "solid",
      borderWidth: 1,
      marginTop: 20,
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 50,
    },
    SymptomAnimation: {
      width: 300,
      height: 300,
    },
    EqualizerView: {
      margin: 25,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    BottomBar: {
      backgroundColor: "#000018",
      marginTop: 30,
      width: "100%",
      flex: 1,
      borderTopLeftRadius: 50,
      borderTopEndRadius: 50,
    },
    BottomBarRow: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: 30,
    },
  });
  