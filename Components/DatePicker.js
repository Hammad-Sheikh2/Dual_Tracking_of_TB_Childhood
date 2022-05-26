import DateTimePicker from '@react-native-community/datetimepicker';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";


export default function DatePicker(props){
    const [date, setDate] = useState(props.value);
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        props.setValue(selectedDate || date);
        setShow(false);
        setDate(currentDate);
    };
    
    const showDatepicker = () => {
        setShow(true);
    };

    return(
        <TouchableOpacity style={styles.container} onPress={showDatepicker}>
            <Text>{date.toDateString()}</Text>
            {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            onChange={onChange}
            />
             )}
            <Text style={styles.placeHolder}>DOB</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        height:50,
        margin:5,
        flexDirection:'row',
        backgroundColor:'white',
        width:'90%',
        justifyContent:"space-between",
        alignItems:'center',
        paddingHorizontal:10,
        borderRadius:10
    },
    placeHolder:{
        color:'#9F9F9F'
    }
})