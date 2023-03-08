import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CurrencyInput from 'react-native-currency-input';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
    navigation: any;
    proceed: any;
}

const EnterAmount: React.FC<Props> = ({navigation, proceed}) => {
    const types = [
        {id: 'default', label: 'Default', value: 'default'},
        {id: 'savings', label: 'Savings', value: 'savings'},
    ];

    const [amount, setAmount] = useState<number | null>(null);
    const [accountType, setAccountType] = useState('');
    const [openDrop, setOpenDrop] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);

    const submitHandler = () => {
        let data = {
            amount,
            accountType,
        };
        proceed(data);
    };

    return (
        <View style={{flex: 1}}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                }}>
                <TouchableOpacity activeOpacity={0.8} onPress={navigation}>
                    <AntDesign name="arrowleft" color={'#000'} size={20} />
                </TouchableOpacity>
                <Text style={[styles.textBold, {marginLeft: 10, fontSize: 15}]}>
                    Withdrawal
                </Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.label}>Enter Amount:</Text>
                <View style={{position: 'relative'}}>
                    <CurrencyInput
                        value={amount}
                        style={styles.input}
                        onChangeValue={val => setAmount(val)}
                        prefix={'₦ '}
                        signPosition="beforePrefix"
                        delimiter=","
                        precision={2}
                        separator="."
                        placeholder="Enter amount to withdraw"
                        placeholderTextColor={'#525252'}
                        showSoftInputOnFocus={showKeyboard}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{position: 'absolute', right: 10, top: 15}}
                        onPress={() => setShowKeyboard(!showKeyboard)}>
                        <MaterialCommunityIcons
                            name={showKeyboard ? 'keyboard' : 'keyboard-off'}
                            size={20}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.label}>Account Type:</Text>
                <View style={{marginBottom: 20, zIndex: 9991}}>
                    <DropDownPicker
                        open={openDrop}
                        value={accountType}
                        items={types}
                        setOpen={setOpenDrop}
                        setValue={setAccountType}
                        disableBorderRadius={true}
                        style={styles.input}
                        dropDownContainerStyle={{
                            backgroundColor: '#fff',
                            zIndex: 1000,
                            elevation: 5,
                        }}
                        placeholder="Select Account Type"
                        searchable={false}
                        theme={'LIGHT'}
                        placeholderStyle={{color: '#545454'}}
                    />
                </View>
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
                            Proceed to Withdraw
                        </Text>
                        <Feather
                            name="arrow-right-circle"
                            color="#fff"
                            size={18}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default EnterAmount;

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        color: '#545454',
    },
    textBold: {
        fontFamily: 'Inter-Bold',
        fontSize: 13,
        color: '#000',
    },
    body: {
        flex: 1,
        paddingTop: 30,
        minHeight: 300,
    },
    input: {
        height: 50,
        marginBottom: 20,
        shadowRadius: 1,
        shadowOpacity: 0.2,
        borderWidth: 1,
        borderRadius: 3,
        fontFamily: 'Inter-Regular',
        paddingLeft: 15,
        borderColor: '#545454',
    },
    label: {
        color: '#545454',
        fontSize: 11,
        marginBottom: 6,
    },
    bottom: {justifyContent: 'center', alignItems: 'center', marginTop: 40},
    btn: {
        backgroundColor: '#0037ba',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 20,
    },
});
