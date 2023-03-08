import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={28} color={'#FFF'} />
            <Text style={styles.text}>Please Wait...</Text>
        </View>
    );
};

export default Loader;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 991,
    },
    text: {
        fontFamily: 'Inter-Medium',
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 5,
    },
});
