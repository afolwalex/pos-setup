import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../navigation/RootNav';
import Result from '../components/Transfer/Result';
import CurrencyInput from 'react-native-currency-input';
import DropDownPicker from 'react-native-dropdown-picker';

const banks = [
    {label: 'Access Bank', value: '001'},
    {label: 'First Bank', value: '002'},
    {label: 'GTBank', value: '003'},
    {label: 'Getripay', value: '004'},
];

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'Transfer'>;
}

const Transfer: React.FC<Props> = ({navigation}) => {
    const [amount, setAmount] = useState<number | null>(null);
    const [selectBank, setSelectBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [pin, setPin] = useState('');

    const [showKeyboard, setShowKeyboard] = useState(true);
    const [openDrop, setOpenDrop] = useState(false);
    const [loadingName, setLoadingName] = useState(false);
    const [loader, setLoader] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        setCompleted(false);
    }, []);

    const get_accountdetails = (value: any) => {
        setAccountName('');
        setAccountNumber(value);
        if (value.length === 10) {
            setAccountName('Babatunde Sulaimon');
        }
    };

    const submitHandler = () => {
        if (!amount) {
            setAmount(500);
        }
        setCompleted(true);
    };

    return (
        <View style={{flex: 1, backgroundColor: '#0037ba'}}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {!completed ? (
                        <View style={{flex: 1}}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.goBack()}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                }}>
                                <AntDesign
                                    name="arrowleft"
                                    color={'#000'}
                                    size={22}
                                />
                                <Text
                                    style={[
                                        styles.textBold,
                                        {marginLeft: 10, fontSize: 15},
                                    ]}>
                                    Transfer
                                </Text>
                            </TouchableOpacity>
                            <View
                                style={{alignItems: 'flex-end', marginTop: 10}}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        setShowKeyboard(!showKeyboard)
                                    }>
                                    <MaterialCommunityIcons
                                        name={
                                            showKeyboard
                                                ? 'keyboard'
                                                : 'keyboard-off'
                                        }
                                        size={20}
                                        color="#000"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.body}>
                                <Text style={styles.label}>Enter Amount:</Text>
                                <CurrencyInput
                                    value={amount}
                                    style={styles.input}
                                    onChangeValue={val => setAmount(val)}
                                    prefix={'₦ '}
                                    signPosition="beforePrefix"
                                    delimiter=","
                                    precision={2}
                                    separator="."
                                    placeholder="Enter amount to transfer"
                                    placeholderTextColor={'#525252'}
                                    showSoftInputOnFocus={showKeyboard}
                                    editable={
                                        loader || loadingName ? false : true
                                    }
                                />
                                <Text style={styles.label}>
                                    Recipient's Bank:
                                </Text>
                                <View style={{zIndex: 9991}}>
                                    <DropDownPicker
                                        open={openDrop}
                                        value={selectBank}
                                        items={banks}
                                        setOpen={setOpenDrop}
                                        setValue={setSelectBank}
                                        disableBorderRadius={true}
                                        style={styles.input}
                                        dropDownContainerStyle={{
                                            backgroundColor: '#fff',
                                            zIndex: 1000,
                                            elevation: 5,
                                        }}
                                        placeholder="Select Bank"
                                        searchable={true}
                                        theme={'LIGHT'}
                                        placeholderStyle={{color: '#545454'}}
                                        listMode="MODAL"
                                        disabled={
                                            loader || loadingName ? true : false
                                        }
                                    />
                                </View>
                                <Text style={styles.label}>
                                    Account Number:
                                </Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        {marginBottom: accountName ? 2 : 20},
                                    ]}
                                    value={accountNumber}
                                    onChangeText={text =>
                                        get_accountdetails(text)
                                    }
                                    placeholder="Account Number"
                                    keyboardType="number-pad"
                                    maxLength={10}
                                    editable={
                                        loader || loadingName ? false : true
                                    }
                                />
                                {accountName && (
                                    <View
                                        style={{
                                            alignItems: 'flex-end',
                                            marginBottom: 10,
                                        }}>
                                        <Text
                                            style={[
                                                styles.text,
                                                {color: '#0037ba'},
                                            ]}>
                                            {accountName}
                                        </Text>
                                    </View>
                                )}
                                <Text style={styles.label}>PIN:</Text>
                                <TextInput
                                    style={[styles.input]}
                                    value={pin}
                                    onChangeText={text => setPin(text)}
                                    placeholder="Enter your PIN here"
                                    keyboardType="number-pad"
                                    maxLength={4}
                                    editable={
                                        loader || loadingName ? false : true
                                    }
                                />
                                <View style={styles.bottom}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.btn}
                                        onPress={submitHandler}>
                                        <Text
                                            style={[
                                                styles.text,
                                                {
                                                    color: '#fff',
                                                    marginRight: 10,
                                                },
                                            ]}>
                                            Proceed to Transfer
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
                    ) : (
                        <Result
                            amount={Number(amount)}
                            navigation={() => navigation.navigate('Dashboard')}
                        />
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

export default Transfer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
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
        paddingTop: 5,
    },
    label: {
        color: '#545454',
        fontSize: 11,
        marginBottom: 6,
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
    bottom: {
        marginTop: 10,
        marginBottom: 15,
    },
});
