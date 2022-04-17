import React from 'react';
import '../global.js';
import { StyleSheet, Text, View } from 'react-native';
import TestChart from'../pie';
import { useState } from 'react';
// import PieChart from 'react-native-pie-chart';
// import Pie from 'react-native-pie'

// import { TouchableOpacity } from 'react-native';
// import { CedarvilleCursive_400Regular } from '@expo-google-fonts/dev';



let percent = 0;
let percentString = '';
let data =  [10, 13, 8, 19, 17];
function calcPercent() {
    percent = global.totalSpent / global.maxBudget;
    percentString = percent * 100 + '%';
    console.log(percentString);
}

const PercentageBar = ({
    navigation,
    percentage,
    height,
    backgroundColor,
    completedColor,
}) => {
    const [getPercentage, setPercentage] = useState(percentage);
    const [getheight, setHeight] = useState(height);
    const [getBackgroundColor, setBackgroundColor] = useState(backgroundColor);
    const [getCompletedColor, setCompletedColor] = useState(completedColor);
    return (
        <View>
            <View style={{ justifyContent: 'center' }}>
                <View
                    style={{

                        width: '100%',
                        height: getheight,
                        marginVertical: 10,
                        borderRadius: 5,
                        borderColor: getBackgroundColor,
                        borderWidth: 1,
                    }}
                />
                <View
                    style={{
                        width: getPercentage ? getPercentage : 0,
                        height: getheight,
                        marginVertical: 10,
                        borderRadius: 5,
                        backgroundColor: getCompletedColor,
                        position: 'absolute',
                        bottom: 20
                    }}
                />
                <View
                    style={{
                        width: getPercentage ? getPercentage : 0,
                        height: getheight,
                        bottom: 10
                    }}>
                    <Text style={{ textAlign: 'right' }}>{getPercentage}</Text>
                    
                </View>
            </View>
        </View>
    );
};

export function Budget() {
    calcPercent();
    console.log("maxfoodbudg: ", global.maxBudget);
    return (
        <View style= {styles.mainContainer}>

            <View style={styles.container}>
                <Text style={styles.title}>Budget</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 25, margin: 20, textAlign: 'center' }}>
                    Spendings Data
                </Text>
                <View style={{ width: 300}}>
                    <PercentageBar
                        height={20}
                        backgroundColor={'grey'}
                        completedColor={'blue'}
                        percentage={percentString}
                    />
                </View>
            </View>
            <Text style={styles.text}>You spend ${global.totalSpent} out of your ${global.maxBudget} budget.</Text>
            <TestChart/>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
        backgroundColor: "rgb(194, 246, 255)",
        height: "100%",
    },
    container: {
        backgroundColor: "rgb(194, 246, 255)",
        alignItems: "center",
        width: "80%",
        alignSelf: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
    },
    text: {
        fontSize: 25,
        textAlign: 'center',
    },
});

