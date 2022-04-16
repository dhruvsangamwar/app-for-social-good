import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Budget() {
    return (
    <View style={styles.container}>
        <Text style={styles.text}>Budget Better</Text>
    </View>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 60,
        color: "white",
        textAlign: "left",
        textAlignVertical: "bottom",
    }
});

