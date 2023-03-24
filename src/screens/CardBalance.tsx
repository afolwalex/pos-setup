import {ScrollView, StyleSheet, View, NativeModules} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import InsertCard from '../components/CardBalance/InsertCard';
import {RootStackParamList} from '../navigation/RootNav';
import EnterPin from '../components/CardBalance/EnterPin';
import Receipt from '../components/CardBalance/Receipt';

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'CardBalance'>;
}

const CardBalance: React.FC<Props> = ({navigation}) => {
    const [step, setStep] = useState(1);
    const [load, setLoad] = useState(false);

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
                    setLoad(true);
                    readCard();
                } else {
                    setLoad(false);
                    checkAgain();
                }
            },
            (error: any) => {
                setLoad(false);
                console.log(error, 'Error');
            },
        );
    };

    const readCard = () => {
        NativeModules.MorefunReactModule.readIcCard(`100`).then(
            (data: any) => {
                let result = data ? JSON.parse(data) : {};
                console.log(result.CardNo, 'Result');
                if (result.CardNo) {
                    console.log(result.CardNo);
                    setLoad(false);
                    setStep(2);
                }
            },
            (error: any) => {
                console.log(error, 'Error');
                setLoad(false);
            },
        );
    };

    const withdrawHandler = (pin: string) => {
        console.log(pin);
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
            setStep(3);
        }, 2000);
    };

    return (
        <View style={{flex: 1, backgroundColor: '#0037ba'}}>
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex: 1}}>
                    {step === 1 ? (
                        <InsertCard
                            navigation={() => navigation.goBack()}
                            load={load}
                        />
                    ) : step === 2 ? (
                        <EnterPin
                            navigation={() => navigation.goBack()}
                            proceed={withdrawHandler}
                            load={load}
                        />
                    ) : step === 3 ? (
                        <Receipt
                            navigation={() => navigation.navigate('Dashboard')}
                        />
                    ) : (
                        <></>
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

export default CardBalance;

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
});
