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
  import { data } from "../Data";
  import TopBar from "../Components/TopBar.js";
  import { openDatabase } from 'expo-sqlite';
import { route } from "../assets/route";
  const db = openDatabase('db.DualTracking')
  const { width } = Dimensions.get("window");
  let isCompletionMessageShowed = false;
  var index = 0;
  var nextIndex = 1;
  export default function Questionnaire(props) {
    const [Item, setItem] = useState(data[0]);
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
      data[currentDataItem].Value = sliderValue;
      if (!isCompletionMessageShowed) {
        let isUnAnsweredQuestionRemain = false;
        for (let index = 0; index < data.length; index++) {
          if (data[index].Value === null) {
            isUnAnsweredQuestionRemain = true;
            nextIndex = index;
            index = data.length;
          }
        }
        if (!isUnAnsweredQuestionRemain) {
          isCompletionMessageShowed = true;
          setItem(data[0]);
          setSliderValue(data[0].Value === null ? 0 : data[0].Value);
          setCurrentDataItem(0);
          setTranslation(data[0].Value * (245/10));
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
        if (currentDataItem >= data.length - 1) {
          return;
        }
        var currentItem = data[index];
        var nextItem = data[nextIndex];
        data[nextIndex] = currentItem;
        data[index] = nextItem;
        setItem(data[index]);
        setSliderValue(data[index].Value === null ? 0 : data[index].Value);
        setCurrentDataItem(index);
        setTranslation(data[index].Value * (245/10));
      }
      else{
        setItem(data[currentDataItem]);
        setTranslation(data[currentDataItem].Value * (245/10));
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
      index < parseInt(data.length / 4) + (data.length % 4 === 0 ? 0 : 1);
      index++
    ) {
      let rowContent = [];
      for (
        let i = 0;
        i <
        (index === parseInt(data.length / 4) + (data.length % 4 === 0 ? 0 : 1) - 1
          ? data.length % 4
          : 4);
        i++
      ) {
        rowContent.push(
          <Symptom
            setSliderValue={setSliderValue}
            currentDataItem={index * 4 + i}
            setCurrentDataItem={setCurrentDataItem}
            data={data[index * 4 + i]}
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
              
              db.transaction(function(txn) {
                var query = `Select * from user where id = '${props.route.params.userId}'`;
                txn.executeSql(
                    query, //Query to execute as prepared statement
                    [],
                    function(tx, res) {
                        console.log(res.rows._array[0]);
                        let user = res.rows._array[0];
                        fetch(`${route}/api/authentication/login`, {
                            method: "POST",
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              userName: user.name,
                              password: user.pass,
                            }),
                        })
                        .then((response) => {
                            if (response.status === 200) {
                                return response.json();
                            } else if (response.status === 400) {
                                throw new Error("Invalid Login Attempt");
                            } else {
                                throw new Error();
                            }
                            })
                        .then((responseJson) => {
                            console.log("ADD CHILD Login ---> DATA : ", responseJson);
                            let responseArr = [];
                            data.forEach((value)=>{
                              responseArr.push({
                                Id:0,
                                Value:value.Value,
                                Date: new Date().toISOString(),
                                QuestionnaireId:value.id,
                                ChildId:props.route.params.childId
                              });
                            })
                            console.log(responseArr);
                            fetch(`${route}/api/Responses/AddList`, {
                                method: "POST",
                                headers: {
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(responseArr),
                            })
                            .then((response) => {
                                if (response.status === 200) {
                                } else if (response.status === 400) {
                                    throw new Error("Invalid Login Attempt");
                                } else {
                                    throw new Error();
                                }
                                })
                            .catch((error) => {
                                Alert.alert("Error", error.toString(), [
                                    { text: "cancel", onPress: () => {} },
                                    { text: "ok", onPress: () => {} },
                                ]);
                                  console.log(error);
                            });
                        })
                        .catch((error) => {
                            Alert.alert("Error", error.toString(), [
                                { text: "cancel", onPress: () => {} },
                                { text: "ok", onPress: () => {} },
                            ]);
                            console.log(error);
                        });
                    },  //Callback function to handle the result
                    (txObj, error) => console.log('Error', error)
                );
            });
              /*db.transaction(function(txn) {
                data.forEach((value)=>{
                  var query = "INSERT into Responses(childId,questionId,value,date) VALUES(?,?,?,?)"
                  txn.executeSql(
                    query, //Query to execute as prepared statement
                    [0, value.id, value.Value, new Date],  
                    function(tx, res) {console.log(res);},  //Callback function to handle the result
                    (txObj, error) => console.log('Error', error)
                  );
                })
              });
              Alert.alert("All Done!!", "Data is submitted.", [
                { text: "OK", onPress: () => console.log("Ok Pressed") },
              ]);*/
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
  