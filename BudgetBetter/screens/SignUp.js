import { Rowdies_300Light } from '@expo-google-fonts/dev';
import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Button, Text, Pressable } from 'react-native';
import AwesomeButton from "react-native-really-awesome-button/src/themes/rick";

import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

function onPressFunction() {
    console.log("Button was pressed");
}

export function SignUp(props) {
    return (
        <ImageBackground 
        style={styles.background}
        source={require("../assets/colorful.jpeg")}>
            <Image style={styles.LogoContainer} source={require("../assets/logo2.png")}/>
            <View style={styles.registerButton}
            > 
            <AwesomeButton type="primary" stretch >Register</AwesomeButton>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "flex-end",
    },
    registerButton : {
        width: '100%',
        height: 70,
        backgroundColor: '#F7F0F5',
        paddingLeft:15,
        paddingRight:15,
    },
    ButtonContainer: {
        flexDirection: "row",
        justifyContent:"center",
    },
    LogoContainer: {
        justifyContent: "center"
        // alignItems: 'center',
    },
    // Text: {
        // flex: "flex-middle"
    // }
})