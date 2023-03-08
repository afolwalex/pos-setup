import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useState} from 'react';

import EnterAmount from '../components/Withdrawal/EnterAmount';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootNav';
import InsertCard from '../components/Withdrawal/InsertCard';
import EnterPin from '../components/Withdrawal/EnterPin';
import Result from '../components/Withdrawal/Result';

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'Withdraw'>;
}

const Withdraw: React.FC<Props> = ({navigation}) => {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(0);
    const [load, setLoad] = useState(false);

    const firstStep = (data: any) => {
        console.log(data);
        setAmount(data.amount);
        setStep(2);
    };

    const secondStep = (cardNo: string) => {
        console.log(cardNo);
        setStep(3);
    };

    const withdrawHandler = (pin: string) => {
        console.log(pin);
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
            setStep(4);
        }, 2000);
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
