import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LockScreen from '../screens/LockScreen';
import Dashboard from '../screens/Dashboard';
import Withdraw from '../screens/Withdraw';
import Transfer from '../screens/Transfer';
import TransactionDetails from '../screens/TransactionDetails';
import Bills from '../screens/Bills';
import CardBalance from '../screens/CardBalance';
import {useAppSelector} from '../redux/hooks';
import ChangePin from '../screens/ChangePin';
import Settings from '../screens/Settings';

export type RootStackParamList = {
    LockScreen: undefined;
    Dashboard: undefined;
    Withdraw: undefined;
    Transfer: undefined;
    TransactionDetails: undefined;
    Bills: {type: string};
    CardBalance: undefined;
    ChangePin: {type: string};
    Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNav = () => {
    const {agent_details} = useAppSelector(state => state.basic);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: 'card',
            }}>
            <Stack.Screen name="LockScreen" component={LockScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Withdraw" component={Withdraw} />
            <Stack.Screen name="Transfer" component={Transfer} />
            <Stack.Screen
                name="TransactionDetails"
                component={TransactionDetails}
            />
            <Stack.Screen name="Bills" component={Bills} />
            <Stack.Screen name="CardBalance" component={CardBalance} />
            <Stack.Screen name="ChangePin" component={ChangePin} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    );
};

export default RootNav;

const styles = StyleSheet.create({});
