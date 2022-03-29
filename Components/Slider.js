import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  Easing,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
const COLORS = ["#0f0", "#fa0", "#f00"];
const { width } = Dimensions.get("window");
let w = null;
export default function Slider(props) {
  const [lift, setLift] = useState(0);
  const [size, setSize] = useState(CIRCLE_PICKER_SIZE / 2);
  const [HeartBeat,setHeartBeat] = useState(new Animated.Value(CIRCLE_PICKER_SIZE/2));
  const [submittedButtonVisibility,setSubmittedButtonVisibility] = useState("none");
  const [imageAnim,setImageAnim] = useState(false);
  let sliderEachPointValue = [];
  for (let index = 0; index < 11; index++) {
    sliderEachPointValue.push(
      <Text
        key={index.toString()}
        style={{ color: "white", fontWeight: "bold" }}
      >
        {index}
      </Text>
    );
  }
  const translatePickerOnScale = (e) => {
    w = width*0.60;
    let marginLeft = (width - w) / 2;
    if (
      e.nativeEvent.pageX < marginLeft ||
      e.nativeEvent.pageX > marginLeft + w + 20
    )
      return;
    props.setTranslation(e.nativeEvent.pageX-marginLeft);
    props.setValue(parseInt(((e.nativeEvent.pageX - (marginLeft)) / w) * 10));
  };
  const animationZoomOut = () => {
    HeartBeat.stopAnimation();
    Animated.timing(HeartBeat, {
      toValue: CIRCLE_PICKER_SIZE/4,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    setTimeout(animationZoomIn,1300);
  };
  const animationZoomIn = () => {
    HeartBeat.stopAnimation();
    Animated.timing(HeartBeat, {
      toValue: CIRCLE_PICKER_SIZE/2,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    setTimeout(animationZoomOut,1300);
  };
  return (
    <View>
      <View style={styles.container}>
        <LinearGradient
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.scale}
        >
          <View style={styles.scaleInside}>{sliderEachPointValue}</View>
        </LinearGradient>
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            width: CIRCLE_PICKER_SIZE,
            height: CIRCLE_PICKER_SIZE,
            borderRadius: CIRCLE_PICKER_SIZE / 2,
            backgroundColor: "white",
            borderWidth: 3,
            borderColor: "rgba(0,0,0,0.1)",
            justifyContent: "center",
            alignItems: "center",
            transform: [{ translateX: props.translation }],
          }}
          onTouchStart={() => {
            setLift(-50);
            setSize(CIRCLE_PICKER_SIZE);
            setSubmittedButtonVisibility("flex");
            animationZoomOut();
          }}
          onTouchMove={(e) => {
            translatePickerOnScale(e);
          }}
          onTouchEnd={(e) => {
          }}
        >
          <Animated.View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              elevation: 10,
              shadowColor: "black",
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 0.5,
              shadowRadius: CIRCLE_PICKER_SIZE / 4,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
              transform: [{ translateY: lift }],
            }}
          >
            <Text key={"value"} style={{ fontWeight: "bold", color: "white" }}>
              {props.value}
            </Text>
          </Animated.View>
          <TouchableOpacity style={{transform: [{ translateY: -23 }]}} onPress={()=>{
            setImageAnim(true);
            setTimeout(()=>{
              setSubmittedButtonVisibility("none");
              setImageAnim(false);
              props.onSlidingEnd();
              setLift(0);
              setSize(CIRCLE_PICKER_SIZE / 2);
              HeartBeat.stopAnimation();
            },300);
            }}>
              <Animated.Image style = {{width:HeartBeat,height:HeartBeat,display:submittedButtonVisibility}} source={imageAnim? require("../Icons/tickg.png") :  require("../Icons/tickb.png")} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between",margin:10}}>
        <Text style={[styles.label,{color:"#0f0"}]}>{props.mildLabel}</Text>
        <Text style={[styles.label,{color:"#f00"}]}>{props.severeLabel}</Text>
      </View>
    </View>
  );
}

const CIRCLE_PICKER_SIZE = 45;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: "90%",
  },
  scale: {
    flex: 1,
    borderRadius: 20,
  },
  scaleInside: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  label: {
    fontWeight: "bold"
  }
});
