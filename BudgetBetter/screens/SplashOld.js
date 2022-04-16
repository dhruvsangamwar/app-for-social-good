import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export function Splash() {


    return (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{ height: Dimensions.get("window").height }}>
            <View style={stylesheet._Splash}>
                <View style={[stylesheet._Logo, { display: "flex", flexDirection: "row", alignItems: "center" }]}>
                    <Text style={[stylesheet._Logo, { position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{ translateX: 0 }, { translateY: 0 }], }]}>
                        Budget
                        Better
                    </Text>
                </View>
            </View>
            <Text>
                Test
            </Text>
        </ScrollView>
    )
}

// async function loadFonts() {
//     await Font.loadAsync({
//       'Ionicons': require('./src/assets/fonts/Ionicons.ttf')
//     });
// }

const stylesheet = StyleSheet.create({
    _Splash: {
        position: "relative",
        width: Dimensions.get("window").width,
        height: 812,
        borderRadius: 26,
        overflow: "hidden",
        transform: [
            { translateX: 0 },
            { translateY: 0 },
            { rotate: "0deg" },
        ],
        backgroundColor: "rgba(252, 252, 252, 1)",
        left: 0,
        top: 0,
    },
    _Logo: {
        position: "absolute",
        width: "auto",
        height: "auto",
        left: 104,
        right: "auto",
        top: 636,
        bottom: "auto",
        transform: [
            { translateX: 0 },
            { translateY: 0 },
            { rotate: "0deg" },
        ],
        // fontFamily: "",
        // fontWeight: 400,
        textDecorationLine: "none",
        lineHeight: 67,
        fontSize: 60,
        color: "rgb(1,1,1)",
        textAlign: "left",
        textAlignVertical: "bottom",
        letterSpacing: 0,
    },
});
