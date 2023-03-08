import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LockScreen from '../screens/LockScreen';
import Dashboard from '../screens/Dashboard';
import Withdraw from '../screens/Withdraw';

export type RootStackParamList = {
    LockScreen: undefined;
    Dashboard: undefined;
    Withdraw: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNav = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: 'card',
            }}>
            <Stack.Screen name="LockScreen" component={LockScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Withdraw" component={Withdraw} />
        </Stack.Navigator>
    );
};

export default RootNav;

const styles = StyleSheet.create({});
