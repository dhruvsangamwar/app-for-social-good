import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

export function LocationPermission({ navigation }) {
    return (
            <View style={styles.container}>
                <Image
                    source={require("../assets/location.png")}
                    style={styles.icon}
                />
                <Text style={styles.text1}>
                    Share your location with us to make tracking easy
                </Text>
                <Text style={styles.text2}>
                    Please allow access to your location to making logging easy.
                    Your location will be secure.
                </Text>
                <View style={styles.button1Container}>
                    <Button
                        title="Enter a new location"
                        // color="default"
                        // width="50"
                        style={styles.button}
                    />
                </View>
                <View style={styles.button2Container}>
                    <Button
                        title="Continue"
                        style={styles.continue}
                        color="#3A7CA5"
                        onPress={() => navigation.navigate('HomeScreen')}
                    />
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        // backgroundColor: "red",
        // justifyContent: "center",
        width: "80%",
        alignSelf: "center",
        alignItems: "center",
        height: "100%",
    },

    icon: {
        marginTop: 100,
        width: 70,
        height: 70,
    },

    text1: {
        // display: "flex",
        marginTop: 30,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "700",
    },

    text2: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 15,
    },

    button1Container: {
        marginTop: 100,
        // color: "black",
        // width: '1000px'
        borderRadius: 500,
        overflow: "hidden",
        width: 200,
    },

    button2Container: {
        marginTop: 30,
        borderRadius: 1000,
        overflow: "hidden",
        // padding: '10px',
        width: 400,
    },
});
