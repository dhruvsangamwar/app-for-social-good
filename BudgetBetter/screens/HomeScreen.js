import React from 'react';
import { Button, StyleSheet, Text, View, Pressable, Image, ImageBackground} from 'react-native';
import AwersomeButton from "react-native-really-awesome-button/src/themes/rick";

export function HomeScreen() {
    return (
    <ImageBackground 
    style={styles.background}
    source={require("../assets/homepage.jpeg")}>
    <View style={styles.container}>
        <Text style={styles.title}>Hello User!</Text>
        <Text style={styles.spacing}></Text>
        <Text style={styles.text}>Select a Category of Spending</Text>
        <View style={styles.buttonContainer}>
            <AwersomeButton type="primary" width={92} borderRadius={10}>Food</AwersomeButton>
            <AwersomeButton type="primary" width={92} borderRadius={10}>Groceries</AwersomeButton>
            <AwersomeButton type="primary" width={92} borderRadius={10}>Books/Supplies</AwersomeButton>
            <AwersomeButton type="primary" width={92} borderRadius={10}><Image source={require("../assets/more_horizontal.png")} /></AwersomeButton>
        </View>
    </View>
    </ImageBackground>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        fontWeight:"bold",
        color: "black",
        alignSelf: "flex-start",
        paddingLeft:10,
        marginTop: 30,
        textAlignVertical: "top",
    },
    text: {
        fontSize: 20,
        alignSelf: "flex-start",
        paddingLeft:10,
        color: 'black',
    },
    spacing: {
        marginTop: 15,
        marginBottom: 15,
    },
    buttonContainer: {
        padding:20,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    button: {
        margin: "5%",
        color: 'rgb(20, 255, 255)',
        
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "flex-end",
    },

});

