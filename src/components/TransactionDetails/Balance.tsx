import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
    navigation: any;
    click: any;
}

const Balance: React.FC<Props> = ({navigation, click}) => {
    const [showBalance, setShowBalance] = useState(false);

    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <AntDesign name="arrowleft" color={'#fff'} size={22} />
                    <Text
                        style={[
                            styles.text,
                            {
                                color: '#fff',
                                fontSize: 13,
                                marginLeft: 6,
                            },
                        ]}>
                        Transaction History
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.filter}
                    onPress={click}>
                    <Text
                        style={[
                            styles.text,
                            {color: '#fff', fontSize: 11, marginRight: 4},
                        ]}>
                        Filter
                    </Text>
                    <AntDesign name="filter" size={15} color="#fff" />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 30,
                }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setShowBalance(!showBalance)}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={[
                            styles.textBold,
                            {
                                color: '#fff',
                                fontSize: 20,
                                marginRight: 12,
                            },
                        ]}>
                        {showBalance ? `₦100,000` : '₦******'}
                    </Text>
                    <Feather
                        name={showBalance ? 'eye' : 'eye-off'}
                        color={'#fff'}
                        size={18}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: 'Inter-Light',
                        color: '#fff',
                        fontSize: 10,
                        marginTop: 5,
                    }}>
                    Your Current Balance
                </Text>
            </View>
        </>
    );
};

export default Balance;

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
    },
    textBold: {
        fontFamily: 'Inter-Bold',
        fontSize: 13,
        color: '#000',
    },
    filter: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 10,
    },
});
