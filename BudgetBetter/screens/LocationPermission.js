import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

export function LocationPermission() {
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
                        width="50"
                        style={styles.button}
                    />
                </View>
                <View style={styles.button2Container}>
                    <Button
                        title="Continue"
                        style={styles.continue}
                        color="#3A7CA5"
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
        marginTop: "100px",
        width: 70,
        height: 70,
    },

    text1: {
        // display: "flex",
        marginTop: "30px",
        textAlign: "center",
        fontSize: "30px",
        fontWeight: "700px",
    },

    text2: {
        marginTop: "20px",
        textAlign: "center",
        fontSize: "15px",
    },

    button1Container: {
        marginTop: "100px",
        // color: "black",
        // width: '1000px'
        borderRadius: 500,
        overflow: "hidden",
    },

    button2Container: {
        marginTop: "30px",
        borderRadius: "1000px",
        overflow: "hidden",
        // padding: '10px',
        width: "400px",
    },
});
