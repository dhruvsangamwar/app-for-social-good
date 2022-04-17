import React from 'react';
import { Button, StyleSheet, Text, View, Pressable} from 'react-native';
import AwersomeButton from "react-native-really-awesome-button/src/themes/rick";


function spendingCategory() {
    console.log('3');
}

export function HomeScreen() {
    return (
    <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
        <Text style={styles.spacing}></Text>
        <Text style={styles.text}>Select a Category of Spending</Text>

        <View style={styles.buttonContainer}>
            <AwersomeButton type="primary" width={100} borderRadius={10}>Food</AwersomeButton>
            <AwersomeButton>Groceries</AwersomeButton>
            <AwersomeButton>Books/Supplies</AwersomeButton>
        </View>
    </View>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    title: {
        fontSize: 50,
        color: "white",
        textAlign: "left",
        marginTop: 30,
        textAlignVertical: "top",
    },
    text: {
        fontSize: 20,
        color: 'rgb(20, 255, 255)',
    },
    spacing: {
        marginTop: 15,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    button: {
        margin: "5%",
        color: 'rgb(20, 255, 255)',
        
    }

});

