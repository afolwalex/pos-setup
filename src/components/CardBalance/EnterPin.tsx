import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Keyboard from '../Keyboard';
import Loader from '../Loader';

interface Props {
    navigation: any;
    proceed: any;
    load: boolean;
}

const EnterPin: React.FC<Props> = ({navigation, proceed, load}) => {
    const [pin, setPin] = useState('');
    const [showKeyboard, setShowKeyboard] = useState(false);

    const keyboardValue = (val: string) => {
        if (pin) {
            setPin(pin + val);
        } else {
            setPin(val);
        }
    };

    const clearInput = () => {
        setPin('');
    };

    const submitHandler = () => {
        if (pin.length === 4) {
            proceed(pin);
        }
    };

    return (
        <View style={{flex: 1}}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                    justifyContent: 'space-between',
                }}>
                <TouchableOpacity activeOpacity={0.8} onPress={navigation}>
                    <AntDesign name="arrowleft" color={'#000'} size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setShowKeyboard(!showKeyboard)}>
                    <MaterialCommunityIcons
                        name={showKeyboard ? 'keyboard' : 'keyboard-off'}
                        size={24}
                        color="#000"
                    />
                </TouchableOpacity>
            </View>
            <View style={[styles.body, {marginTop: showKeyboard ? 0 : 20}]}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.textSemi}>Enter Card PIN</Text>
                </View>
                <View style={styles.inputField}>
                    <View
                        style={{
                            marginTop: 5,
                            width: '50%',
                        }}>
                        <TextInput
                            value={pin}
                            onChangeText={text => setPin(text)}
                            keyboardType="number-pad"
                            showSoftInputOnFocus={false}
                            style={[
                                styles.input,
                                {
                                    borderBottomColor: showKeyboard
                                        ? 'rgba(0,0,0,0.04)'
                                        : 'rgba(0,0,0,0.1)',
                                },
                            ]}
                            autoFocus={true}
                            secureTextEntry={true}
                            maxLength={4}
                            onSubmitEditing={submitHandler}
                        />
                    </View>
                </View>
                {showKeyboard && (
                    <Keyboard
                        keyboardValue={keyboardValue}
                        clearInput={clearInput}
                        enterValue={submitHandler}
                    />
                )}
                <View style={styles.bottom}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btn}
                        onPress={submitHandler}>
                        <Text
                            style={[
                                styles.text,
                                {color: '#fff', marginRight: 10},
                            ]}>
                            Check Balance
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {load && <Loader />}
        </View>
    );
};

export default EnterPin;

const styles = StyleSheet.create({
    body: {
        position: 'relative',
        flex: 1,
    },
    textBold: {
        fontFamily: 'Inter-Bold',
        color: '#1F1F1F',
        fontSize: 20,
    },
    textSemi: {
        fontFamily: 'Inter-Medium',
        color: '#1F1F1F',
        fontSize: 14,
        marginTop: 5,
    },
    input: {
        borderBottomWidth: 1,
        fontSize: 25,
        width: '100%',
        textAlign: 'center',
    },
    inputField: {
        alignItems: 'center',
    },
    btn: {
        backgroundColor: '#0037ba',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 20,
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
    },
    text: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        color: '#000',
    },
});
