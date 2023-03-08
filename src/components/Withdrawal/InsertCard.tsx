import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    NativeModules,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Img from '../../assets/insert-card.svg';
import Loader from '../Loader';

interface Props {
    navigation: any;
    proceed: any;
    amount: number;
}

const InsertCard: React.FC<Props> = ({navigation, proceed, amount}) => {
    const [loadCard, setLoadCard] = useState(false);

    useEffect(() => {
        checkCard();
    }, []);

    const checkAgain = () => {
        setTimeout(() => {
            checkCard();
        }, 2000);
    };

    const checkCard = () => {
        NativeModules.MorefunReactModule.isCardExist().then(
            (data: any) => {
                let result = data ? JSON.parse(data) : {};
                if (result.iccCard) {
                    setLoadCard(true);
                    readCard();
                } else {
                    setLoadCard(false);
                    checkAgain();
                }
            },
            (error: any) => {
                setLoadCard(false);
                console.log(error, 'Error');
            },
        );
    };

    const readCard = () => {
        NativeModules.MorefunReactModule.readIcCard(`${amount}`).then(
            (data: any) => {
                let result = data ? JSON.parse(data) : {};
                console.log(result.CardNo, 'Result');
                if (result.CardNo) {
                    proceed(result.CardNo);
                    setLoadCard(false);
                }
            },
            (error: any) => {
                console.log(error, 'Error');
            },
        );
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
                        height: 300,
                    }}>
                    <Img height={'100%'} />
                </View>
            </View>
            {loadCard && <Loader />}
        </View>
    );
};

export default InsertCard;

const styles = StyleSheet.create({
    body: {
        paddingTop: 5,
    },
    text: {
        fontFamily: 'Inter-Medium',
        fontSize: 12,
        color: '#545454',
        textAlign: 'center',
        marginTop: 5,
    },
    textBold: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        color: '#000',
        textAlign: 'center',
    },
});
