import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Logo from '../../assets/logo.svg';
import {TouchableOpacity} from 'react-native';

interface Props {
    navigation: any;
}

const Result: React.FC<Props> = ({navigation}) => {
    return (
        <View
            style={{
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 20,
                position: 'relative',
                flex: 1,
                height: '100%',
            }}>
            <View
                style={{
                    alignItems: 'flex-end',
                    width: '100%',
                    marginBottom: 5,
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
            <Logo height={30} />
            <Text style={styles.textBold}>Withdraw Succesful</Text>
            <Text style={styles.text}>
                Lorem ipsum dolor sit amet consectetur. Convallis eu nascetur
                nibh hac scelerisque suscipit suspendisse.
            </Text>
            <View
                style={{position: 'absolute', bottom: 20, right: 30, left: 30}}>
                <TouchableOpacity
                    style={[styles.btn, {backgroundColor: '#0037BA'}]}>
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

export default Result;

const styles = StyleSheet.create({
    textBold: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 22,
        color: '#000',
        marginTop: 20,
    },
    text: {
        fontFamily: 'Inter-Medium',
        fontSize: 12,
        color: '#4D4D4D',
        marginTop: 10,
        textAlign: 'center',
    },
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
});
