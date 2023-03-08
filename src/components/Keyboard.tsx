import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
    keyboardValue: any;
    clearInput: any;
    enterValue: any;
}

const Keyboard: React.FC<Props> = ({keyboardValue, clearInput, enterValue}) => {
    return (
        <View style={styles.container}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => (
                <TouchableOpacity
                    activeOpacity={0.3}
                    style={styles.btn}
                    onPress={() => keyboardValue(`${k}`)}
                    key={k}>
                    <Text style={styles.text}>{k}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                activeOpacity={0.3}
                style={styles.btn}
                onPress={clearInput}>
                <Entypo
                    name="cross"
                    style={styles.icon}
                    size={25}
                    color="#FF0000"
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.3}
                style={styles.btn}
                onPress={() => keyboardValue(`0`)}>
                <Text style={styles.text}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.3}
                style={styles.btn}
                onPress={enterValue}>
                <Feather name="arrow-right-circle" color="#0037ba" size={25} />
            </TouchableOpacity>
        </View>
    );
};

export default Keyboard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Inter-Medium',
        fontSize: 25,
    },
    btn: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {},
});
