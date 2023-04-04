import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import EnterAmount from '../components/Withdrawal/EnterAmount';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootNav';
import InsertCard from '../components/Withdrawal/InsertCard';
import EnterPin from '../components/Withdrawal/EnterPin';
import Result from '../components/Withdrawal/Result';
import withdrawService from '../redux/withdraw/withdrawService';

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'Withdraw'>;
}

const Withdraw: React.FC<Props> = ({navigation}) => {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(0);
    const [load, setLoad] = useState(false);

    const firstStep = (data: any) => {
        setAmount(data.amount);
        setStep(2);
    };

    const secondStep = (cardNo: string) => {
        setStep(3);
    };

    const withdrawHandler = async (pin: string) => {
        try {
            let data = {
                cardNumber: '1234848399292',
                accountType: 'savings',
                amount,
                pin: '1234',
            };
            setLoad(true);
            const res = await withdrawService.cardWithdrawal(data);
            setStep(4);
        } catch (err: any) {
            console.log(err.response);
            setLoad(false);
        }
    };

    return (
        <View style={{flex: 1, backgroundColor: '#0037ba'}}>
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex: 1}}>
                    {step === 1 ? (
                        <EnterAmount
                            navigation={() => navigation.goBack()}
                            proceed={firstStep}
                        />
                    ) : step === 2 ? (
                        <InsertCard
                            navigation={() => setStep(1)}
                            proceed={secondStep}
                            amount={amount}
                        />
                    ) : step === 3 ? (
                        <EnterPin
                            navigation={() => setStep(1)}
                            amount={amount}
                            proceed={withdrawHandler}
                            load={load}
                        />
                    ) : step === 4 ? (
                        <Result
                            navigation={() => navigation.navigate('Dashboard')}
                            amount={amount}
                        />
                    ) : (
                        <></>
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

export default Withdraw;

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
