import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EnterAmount from '../components/Withdrawal/EnterAmount';
import Test from './Test';

const Withdraw = () => {
    return (
        <View style={{flex: 1, backgroundColor: '#0037ba'}}>
            <View style={styles.head}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 10,
                    }}>
                    <AntDesign name="arrowleft" color={'#000'} size={20} />
                    <Text
                        style={[
                            styles.textBold,
                            {marginLeft: 10, fontSize: 15},
                        ]}>
                        Withdrawal
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* <EnterAmount /> */}
                </ScrollView>
            </View>
        </View>
    );
};

export default Withdraw;

const styles = StyleSheet.create({
    head: {
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
    body: {},
});
