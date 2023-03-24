import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import formatCurrency from '../../utils/formatCurrency';

const transactions = [
    {
        date: '15 MAY 2020',
        id: 1,
        list: [
            {
                id: 1,
                type: 'Card Withdrawal',
                name: 'Denis Dapol',
                time: '9:00am',
                amount: 19800,
            },
            {
                id: 2,
                type: 'Transfer',
                name: 'Ademola Lukmon',
                time: '9:00am',
                amount: 10000,
            },
        ],
    },
    {
        date: '16 MAY 2020',
        id: 2,
        list: [
            {
                id: 1,
                type: 'Card Withdrawal',
                name: 'Denis Dapol',
                time: '9:00am',
                amount: 19800,
            },
            {
                id: 2,
                type: 'Transfer',
                name: 'Ademola Lukmon',
                time: '9:00am',
                amount: 10000,
            },
            {
                id: 3,
                type: 'Transfer',
                name: 'Ademola Lukmon',
                time: '9:00am',
                amount: 10000,
            },
        ],
    },
];

const Detail = () => {
    return (
        <>
            {transactions.map(t => (
                <View key={t.id} style={{marginBottom: 10}}>
                    <Text
                        style={[styles.text, {fontSize: 13, marginBottom: 6}]}>
                        {t.date}
                    </Text>
                    {t.list.map(l => (
                        <View key={l.id} style={{marginBottom: 10}}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={styles.imgDiv}>
                                        <Image
                                            source={require('../../assets/bank.jpeg')}
                                            style={styles.img}
                                        />
                                    </View>
                                    <View style={{marginLeft: 5}}>
                                        <Text style={styles.textBold}>
                                            {l.type}
                                        </Text>
                                        <Text style={styles.text}>
                                            {l.name} {l.time}
                                        </Text>
                                    </View>
                                </View>
                                <Text
                                    style={[
                                        styles.textBold,
                                        {
                                            color:
                                                l.type === 'Transfer'
                                                    ? '#038610'
                                                    : '#DD0000',
                                        },
                                    ]}>
                                    ₦{formatCurrency(l.amount)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            ))}
        </>
    );
};

export default Detail;

const styles = StyleSheet.create({
    img: {
        height: 30,
        width: 30,
    },
    imgDiv: {
        borderWidth: 1,
        borderColor: '#F4F4F6',
        padding: 10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    textBold: {
        fontFamily: 'Inter-Bold',
        fontSize: 12,
    },
    text: {
        fontFamily: 'Inter-Light',
        fontSize: 12,
    },
});
