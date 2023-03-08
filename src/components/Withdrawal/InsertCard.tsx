import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Img from '../../assets/insert-card.svg';

interface Props {
    navigation: any;
    proceed: any;
}

const InsertCard: React.FC<Props> = ({navigation, proceed}) => {
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
            </View>
            <View style={styles.body}>
                <Text style={styles.textBold}>Please Insert card</Text>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet consectetur. Convallis eu
                    nascetur nibh hac scelerisque suscipit suspendisse.
                </Text>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 400,
                    }}>
                    <Img height={'100%'} />
                </View>
            </View>
        </View>
    );
};

export default InsertCard;

const styles = StyleSheet.create({
    body: {},
    text: {
        fontFamily: 'Inter-Medium',
        fontSize: 12,
        color: '#545454',
        textAlign: 'center',
        marginTop: 10,
    },
    textBold: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        color: '#000',
        textAlign: 'center',
    },
});
