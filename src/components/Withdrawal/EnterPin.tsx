import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import formatCurrency from '../../utils/formatCurrency';
import Keyboard from '../Keyboard';
import Loader from '../Loader';

interface Props {
    navigation: any;
    proceed: any;
    amount: number;
    load: boolean;
}

const EnterPin: React.FC<Props> = ({navigation, amount, proceed, load}) => {
    const [pin, setPin] = useState('');

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
                }}>
                <TouchableOpacity activeOpacity={0.8} onPress={navigation}>
                    <AntDesign name="arrowleft" color={'#000'} size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.textBold}>
                        ₦{formatCurrency(amount)}
                    </Text>
                    <Text style={styles.textSemi}>Enter Card PIN</Text>
                </View>
                <View style={styles.inputField}>
                    <View style={{marginTop: 5, width: '50%'}}>
                        <TextInput
                            value={pin}
                            onChangeText={text => setPin(text)}
                            keyboardType="number-pad"
                            showSoftInputOnFocus={false}
                            style={styles.input}
                            autoFocus={true}
                            secureTextEntry={true}
                            maxLength={4}
                            onSubmitEditing={submitHandler}
                        />
                    </View>
                </View>
                <Keyboard
                    keyboardValue={keyboardValue}
                    clearInput={clearInput}
                    enterValue={submitHandler}
                />
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
                            Withdraw
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
    body: {},
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
        borderBottomColor: 'rgba(0,0,0,0.01)',
        borderBottomWidth: 1,
        fontSize: 25,
        width: '100%',
        textAlign: 'center',
    },
    inputField: {alignItems: 'center'},
    btn: {
        backgroundColor: '#0037ba',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 20,
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    text: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        color: '#000',
    },
});
