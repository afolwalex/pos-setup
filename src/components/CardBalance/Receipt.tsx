import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Logo from '../../assets/logo.svg';

interface Props {
    navigation: any;
}

const Receipt: React.FC<Props> = ({navigation}) => {
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 4}}>
                <View
                    style={{
                        alignItems: 'flex-end',
                        width: '100%',
                        marginBottom: 1,
                    }}>
                    <TouchableOpacity activeOpacity={0.2} onPress={navigation}>
                        <Text
                            style={[
                                styles.btnText,
                                {color: '#0037BA', fontSize: 14},
                            ]}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        marginVertical: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Logo height={30} />
                </View>
                <View style={{marginBottom: 15, marginTop: 10}}>
                    <Text style={[styles.text, {fontSize: 14}]}>
                        Available Balance
                    </Text>
                    <Text
                        style={[
                            styles.textBold,
                            {fontSize: 16, marginTop: 5, color: '#0037BA'},
                        ]}>
                        ₦100,000
                    </Text>
                </View>
                <View style={{marginTop: 20}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={[styles.text]}>Date/Time:</Text>
                        <Text style={[styles.textBold]}>
                            24th, March 2023, 11:12AM
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={styles.text}>Account Type:</Text>
                        <Text style={styles.textBold}>Savings</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={styles.text}>Reference ID</Text>
                        <Text style={styles.textBold}>ADGWJJ67SHDHH</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={styles.text}>Ledger Balance</Text>
                        <Text style={[styles.textBold, {color: '#0037BA'}]}>
                            ₦100,000
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    style={[styles.btn, {backgroundColor: '#0037BA'}]}
                    activeOpacity={0.8}>
                    <Text style={[styles.btnText, {color: '#FFFFFF'}]}>
                        Print Receipt
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn]}>
                    <Text style={[styles.btnText, {color: '#0037BA'}]}>
                        Send Receipt
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Receipt;

const styles = StyleSheet.create({
    btn: {
        borderColor: '#0037BA',
        borderWidth: 1,
        marginTop: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 20,
    },
    btnText: {
        fontFamily: 'Inter-Medium',
        fontSize: 12,
    },
    textBold: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 12,
        color: '#000',
    },
    text: {
        fontFamily: 'Inter-Medium',
        fontSize: 12,
        color: '#4D4D4D',
    },
});
