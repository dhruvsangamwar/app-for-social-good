import { Rowdies_300Light } from '@expo-google-fonts/dev';
import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Button, Text, Pressable, SafeAreaView, TextInput } from 'react-native';
import AwesomeButton from "react-native-really-awesome-button/src/themes/rick";
import '../global.js';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';



export function SignUp( {navigation} ) {
    const [text, onChangeText] = React.useState(null);
    const [number, onChangeNumber] = React.useState(null);
    function whenPressed() {
        console.log(global.name);
        console.log(global.maxBudget);
    }
    function changeName(newName) {
        global.name = newName;
    }
    function changeNumber(newNum) {
        global.maxBudget = newNum;
    }
    return (
        <ImageBackground 
        style={styles.background}
        source={require("../assets/colorful.jpeg")} imageStyle={{opacity:0.2}}>
            <View styles={styles.UserPadding}>
            <SafeAreaView>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder="Enter your name"
            onChangeText={number => changeName(number)}
            value={text}
            />
            <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Enter your budget for this month"
            onChangeText={newText => changeNumber(newText)}
            keyboardType="numeric"
            />
            </SafeAreaView> 
            </View>
            <View style={styles.registerButton}>
            <AwesomeButton type="primary" stretch  onPress={() => {whenPressed(); navigation.navigate('LocationPermission')}}>Register</AwesomeButton>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    registerButton : {
        marginTop:"50%",
        width: '100%',
        height: 70,
        backgroundColor: '#F7F0F5',
        paddingLeft:15,
        paddingRight:15,
    },
    ButtonContainer: {
        color:"white"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    UserPadding: {
        borderWidth: 5,
        width: 100,
        height: 100,
        color: "red",
    }
})