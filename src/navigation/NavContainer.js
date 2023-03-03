import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNav from './RootNav';
import {navigationRef} from '../utils/navigation';

const NavContainer = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <SafeAreaView style={styles.container}>
                <RootNav />
            </SafeAreaView>
        </NavigationContainer>
    );
};

export default NavContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#ffffff',
    },
});
