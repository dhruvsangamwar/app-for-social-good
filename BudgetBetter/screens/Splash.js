import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Image, Pressable } from 'react-native';

function nextPage() {
    
}

export function Splash({ navigation }) {
    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate('SignUp')} >

        
        <View >
            <Image source={require("../assets/pig.png")}></Image>
            <Text style={styles.baseText}>
            Budget
            
            </Text>
            <Text style={styles.innerText}>Better</Text>
        </View>
        </Pressable>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    baseText: {
        fontSize: 60,
        color: "black",
        textAlignVertical: "bottom",
    },
    innerText: {
        fontSize: 60,
        color: "orange",
        justifyContent: "center",
        fontWeight: "bold",
    },
    logo: {
        width: 50,
        height: 50,
    }
});