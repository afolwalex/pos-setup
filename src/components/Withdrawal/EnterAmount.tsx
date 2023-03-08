import {
    StyleSheet,
    Text,
    View,
    NativeModules,
    SafeAreaView,
    Button,
    PermissionsAndroid,
    TextInput,
    Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';

const Separator = () => <View style={styles.separator} />;

const Space = () => <View style={styles.space} />;

const Test = () => {
    const [text, setText] = useState('');
    const [value, setValue] = useState('');

    const onSetText = text => {
        setText(text);
    };

    const getLocation = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Example App',
                message: 'Example App access to your location ',
            },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                position => {
                    Alert.alert('', position.coords.toString());
                },
                error => {
                    console.log(error.code, error.message);
                    Alert.alert('', error.message);
                },
                {timeout: 70000, maximumAge: 10000, enableHighAccuracy: true},
            );
        } else {
            console.log('ACCESS_FINE_LOCATION permission denied');
        }
    };

    const changeValue = text => {
        console.log(text, 'Text');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Space />
            <View>
                <Button
                    title="Get Device Info"
                    onPress={() => {
                        NativeModules.MorefunReactModule.getDeviceInfo().then(
                            data => {
                                console.log(data);
                                onSetText(data);
                            },
                            error => {
                                console.log(error);
                            },
                        );
                    }}
                />
                <Space />
                <Button
                    title="Check Card"
                    onPress={() => {
                        onSetText('Please swipe mag card');
                        NativeModules.MorefunReactModule.isCardExist().then(
                            data => {
                                console.log(data, 'Data');
                            },
                            error => {
                                console.log(error, 'Error');
                            },
                        );
                    }}
                />
                <Space />
                <Button
                    title="Check Card Number"
                    onPress={() => {
                        onSetText('Please swipe mag card');
                        NativeModules.MorefunReactModule.readIcCard('100').then(
                            data => {
                                console.log(data, 'Data');
                            },
                            error => {
                                console.log(error, 'Error');
                            },
                        );
                    }}
                />
                <Space />
                <Button
                    title="Print"
                    onPress={() => {
                        var printData = new Array();
                        printData.push('MERCHANT NAME：Demo shop name');
                        printData.push('MERCHANT NO.：20321545656687');
                        printData.push('TERMINAL NO.：25689753');
                        printData.push('CARD NUMBER');
                        printData.push('62179390*****3426');
                        printData.push('TRANS TYPE');
                        printData.push('SALE');
                        printData.push('EXP DATE：2029');
                        printData.push('BATCH NO：000012');
                        printData.push('VOUCHER NO：000001');
                        printData.push('DATE/TIME：2016-05-23 16:50:32');
                        printData.push('AMOUNT');
                        printData.push(
                            '--------------------------------------',
                        );
                        printData.push(
                            ' I ACKNOWLEDGE	SATISFACTORY RECEIPT OF RELATIVE GOODS/SERVICES',
                        );
                        printData.push(' MERCHANT COPY ');
                        printData.push(
                            '---X---X---X---X---X--X--X--X--X--X--\n',
                        );
                        printData.push('\n');

                        NativeModules.MorefunReactModule.print(printData).then(
                            data => {
                                console.log(data, 'Data Fetched');
                            },
                            error => {
                                console.log(error, 'Error Fetched');
                            },
                        );
                    }}
                />
                <Space />
                <Button
                    title="Check Location"
                    onPress={() => {
                        getLocation();
                    }}
                />
                <TextInput
                    value={value}
                    onChangeText={text => changeValue(text)}
                    placeholder="Text"
                    keyboardType="number-pad"
                    onSubmitEditing={() => console.log('Works?')}
                />
            </View>
        </SafeAreaView>
    );
};

export default Test;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    resultText: {
        color: 'white',
        fontSize: 12,
        alignSelf: 'flex-start',
    },
    space: {
        marginVertical: 5,
    },
});
