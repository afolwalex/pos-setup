import {
    StyleSheet,
    Text,
    View,
    NativeModules,
    SafeAreaView,
    Button,
} from 'react-native';
import React, {useState} from 'react';

const Separator = () => <View style={styles.separator} />;

const Space = () => <View style={styles.space} />;

const App = () => {
    const [text, setText] = useState('');

    const onSetText = text => {
        setText(text);
    };

    const {MorefunReactModule, CalendarModule} = NativeModules;

    console.log(MorefunReactModule);

    return (
        <SafeAreaView style={styles.container}>
            <Space />
            <View>
                <Button
                    title="Get Device Info"
                    onPress={() => {
                        NativeModules.MorefunReactModule.getDeviceInfo().then(
                            data => {
                                onSetText(data);
                            },
                            error => {
                                onSetText(data);
                            },
                        );
                        // CalendarModule.createCalendarEvent();
                    }}
                />
                <Space />
                <Button
                    title="Read Mag Card"
                    onPress={() => {
                        onSetText('Please swipe mag card');
                        NativeModules.MorefunReactModule.readMagCard().then(
                            data => {
                                onSetText(data);
                            },
                            error => {
                                onSetText(data);
                            },
                        );
                    }}
                />
            </View>
        </SafeAreaView>
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
