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

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'Withdraw'>;
}

const Withdraw: React.FC<Props> = ({navigation}) => {
    const [step, setStep] = useState(1);

    const firstStep = (data: any) => {
        console.log(data);
        setStep(2);
    };

    const secondStep = () => {
        setStep(3);
    };

    return (
        <View style={{flex: 1, backgroundColor: '#0037ba'}}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {step === 1 ? (
                        <EnterAmount
                            navigation={() => navigation.goBack()}
                            proceed={firstStep}
                        />
                    ) : step === 2 ? (
                        <InsertCard
                            navigation={() => setStep(1)}
                            proceed={secondStep}
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
