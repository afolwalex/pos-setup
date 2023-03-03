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
import RNBootSplash from 'react-native-bootsplash';
import Geolocation from 'react-native-geolocation-service';
// import NavContainer from './src/navigation/NavContainer';
// import RootNav from './src/navigation/NavContainer';

const Separator = () => <View style={styles.separator} />;

const Space = () => <View style={styles.space} />;

const App = () => {
    const [text, setText] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        RNBootSplash.hide({fade: true});
    }, []);

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
        <View>
            <Text>Test</Text>
        </View>
    );
};

export default App;

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
