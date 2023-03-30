import {StyleSheet, Text, View, NativeModules} from 'react-native';
import React, {useEffect, useState} from 'react';
import Logo from '../../assets/logo.svg';
import {TouchableOpacity} from 'react-native';
import formatCurrency from '../../utils/formatCurrency';
import Entypo from 'react-native-vector-icons/Entypo';
import {useAppSelector} from '../../redux/hooks';

interface Props {
    navigation: any;
    amount: number;
}

const Result: React.FC<Props> = ({navigation, amount}) => {
    const [forWho, setForWho] = useState('customer');
    const [load, setLoad] = useState(false);

    const {agent_details} = useAppSelector(state => state.basic);

    useEffect(() => {
        //printHandler();
    }, []);

    const printHandler = () => {
        setLoad(true);
        let data = {
            forWho: forWho === 'merchant' ? 'Merchant Copy' : 'Customer Copy',
            name: agent_details.agent.businessName,
            location: agent_details.agentTerminal.location,
            terminal: agent_details.terminal.serialNo,
            amount: `₦${formatCurrency(amount)}`,
            cardNo: '53998388*****0022',
            expiry: '05/26',
            cardName: 'Bukola Tosin',
            dateTime: '2023-03-09 09:24:09',
            stan: '01234775',
            aid: 'A0000000004321',
            rrn: '0048588889288',
            message: 'TRANSACTION APPROVED',
            responseCode: '00',
            authorizeCode: '839293',
        };
        NativeModules.MorefunReactModule.print(data).then(
            (data: any) => {
                setLoad(false);
                if (forWho === 'customer') {
                    setForWho('merchant');
                } else {
                    navigation();
                }
            },
            (error: any) => {
                console.log(error);
                setLoad(false);
            },
        );
    };

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
                    <Entypo name="cross" color="#0037BA" size={30} />
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
                    disabled={load}
                    onPress={printHandler}
                    style={[styles.btn, {backgroundColor: '#0037BA'}]}>
                    <Text style={[styles.btnText, {color: '#FFFFFF'}]}>
                        {forWho === 'merchant'
                            ? 'Merchant Copy'
                            : 'Print Receipt'}
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
