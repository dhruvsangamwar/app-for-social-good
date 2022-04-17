import React from 'react';
import '../global.js';
import { Button, StyleSheet, Text, TextInput, View, Pressable, Image, ImageBackground } from 'react-native';
// import AwersomeButton from "react-native-really-awesome-button/src/themes/rick";
import AwesomeButton from "react-native-really-awesome-button/src/themes/rick";


export function HomeScreen({ navigation }) {
    const [number, onChangeNumber] = React.useState(null);
    let tempNum = 0;
    function setCategory(cat) {
        tempNum = parseInt(tempNum);
        global.totalSpent = parseInt(global.totalSpent);
        global.totalSpent += tempNum;
        if (cat === 1) {
            console.log(tempNum);
            global.foodPurchase += tempNum;
        } else if (cat === 2) {
            global.groceryPurchase += tempNum;
        } else {
            global.supplyPurchase += tempNum;
        }
    }
    function changeTemp(newNum) {
        tempNum = newNum;
    }
    return (
        <ImageBackground
            style={styles.background}
            source={require("../assets/homepage.jpeg")}>
            <View style={styles.container}>
                <Text style={styles.title}>Hello User!</Text>
                <Text style={styles.spacing}></Text>
                <Text style={styles.text}>Select a Category of Spending</Text>
                <View style={styles.buttonContainer}>
                    <AwesomeButton type="primary" width={92} borderRadius={10} onPress={() => setCategory(1)}>Food</AwesomeButton>
                    <AwesomeButton type="primary" width={92} borderRadius={10} onPress={() => setCategory(2)}>>Groceries</AwesomeButton>
                    <AwesomeButton type="primary" width={92} borderRadius={10} onPress={() => setCategory(3)}>>Books/Supplies</AwesomeButton>
                    <AwesomeButton type="primary" width={92} borderRadius={10} ><Image source={require("../assets/more_horizontal.png")} /></AwesomeButton>
                </View>
                <TextInput
                    style={styles.input}
                    value={number}
                    placeholder="Enter Purchase Amount"
                    onChangeText={number => changeTemp(number)}
                    keyboardType="numeric"
                />
                <AwesomeButton type="secondary" stretch onPress={() => navigation.navigate('Budget')}>Budget</AwesomeButton>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        fontWeight: "bold",
        color: "black",
        alignSelf: "flex-start",
        paddingLeft: 10,
        marginTop: 30,
        textAlignVertical: "top",
    },
    text: {
        fontSize: 20,
        alignSelf: "flex-start",
        paddingLeft: 10,
        color: 'black',
    },
    spacing: {
        marginTop: 15,
        marginBottom: 15,
    },
    buttonContainer: {
        padding: 20,
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
    input: {
        marginTop: 20,
        marginBottom: 20,
        borderColor: 'black',
        borderWidth: 2,
        margin: 10,
        height: 40,
        borderRadius: 10,
        width: 250,
        textAlign: 'center',
        fontSize: 20,
    },
});

