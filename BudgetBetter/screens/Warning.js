import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import Modal from 'react-native';

export function Warning() {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            >
            <View style={{ flex: 1 }}>
                <Text>You have exceeded your monthly budget!</Text>
            </View>
        </Modal>
    )
    /*return (
        <View style={styles.container}>
            <img src = "https://user-images.githubusercontent.com/98450325/163697008-c7f5d326-7a0b-4e62-8949-9e6128a0ccbc.png"></img>
            <Text style={styles.baseText}>
            Budget<br></br>
            <Text style={styles.innerText}>Better</Text>
            </Text>
        </View>
    );*/
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
        justifyContent: "center",
        textAlignVertical: "bottom",
    },
    innerText: {
        fontSize: 60,
        color: "orange",
        justifyContent: "center",
        fontWeight: "bold",
    }
});