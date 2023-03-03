import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LockScreen from '../screens/LockScreen';

const Stack = createStackNavigator();

const RootNav = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: 'card',
            }}>
            <Stack.Screen name="LockScreen" component={LockScreen} />
        </Stack.Navigator>
    );
};

export default RootNav;

const styles = StyleSheet.create({});
