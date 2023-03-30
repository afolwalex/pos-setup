import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootNav';
import {RouteProp} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import basicService from '../redux/basic/basicService';
import {getAgent} from '../redux/basic/basicSlice';

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'ChangePin'>;
    route: RouteProp<RootStackParamList, 'ChangePin'>;
}

const ChangePin: React.FC<Props> = ({navigation, route}) => {
    const params = route.params.type;

    const dispatch = useAppDispatch();

    const {agent_details} = useAppSelector(state => state.basic);

    const [oldPin, setOldPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async () => {
        if (oldPin && newPin && confirmPin) {
            if (newPin === confirmPin) {
                let data = {
                    serialNo: agent_details.terminal.serialNo,
                    pin: oldPin,
                    newPin,
                };
                try {
                    setLoading(true);
                    const res = await basicService.changePin(data);
                    if (res) {
                        dispatch(getAgent({id: agent_details.terminal.id}));
                        navigation.navigate('Dashboard');
                        ToastAndroid.show(
                            'PIN has been changed successfully',
                            ToastAndroid.SHORT,
                        );
                    }
                    setLoading(false);
                } catch (error: any) {
                    setLoading(false);
                    const message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    if (message) ToastAndroid.show(message, ToastAndroid.SHORT);
                }
            } else {
                Alert.alert('', 'PINs does not match');
            }
        }
    };

    const transactionHandler = () => {};

    return (
        <View style={{flex: 1, backgroundColor: '#0037ba'}}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.goBack()}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 10,
                            }}>
                            <AntDesign
                                name="arrowleft"
                                color={'#000'}
                                size={22}
                            />
                            <Text
                                style={[
                                    styles.textBold,
                                    {
                                        marginLeft: 10,
                                        fontSize: 15,
                                    },
                                ]}>
                                Change {params} PIN
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.body}>
                            <Text style={styles.label}>Old PIN:</Text>
                            <TextInput
                                style={styles.input}
                                value={oldPin}
                                onChangeText={text => setOldPin(text)}
                                placeholder="Enter your PIN here"
                                keyboardType="number-pad"
                                maxLength={4}
                                editable={loading ? false : true}
                            />
                            <Text style={styles.label}>New PIN:</Text>
                            <TextInput
                                style={styles.input}
                                value={newPin}
                                onChangeText={text => setNewPin(text)}
                                placeholder="Enter your New PIN here"
                                keyboardType="number-pad"
                                maxLength={4}
                                editable={loading ? false : true}
                            />
                            <Text style={styles.label}>Confirm New PIN:</Text>
                            <TextInput
                                style={styles.input}
                                value={confirmPin}
                                onChangeText={text => setConfirmPin(text)}
                                placeholder="Confirm your new PIN"
                                keyboardType="number-pad"
                                maxLength={4}
                                editable={loading ? false : true}
                            />
                            <View style={styles.bottom}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.btn}
                                    disabled={loading}
                                    onPress={
                                        params === 'Lock'
                                            ? submitHandler
                                            : transactionHandler
                                    }>
                                    <Text
                                        style={[
                                            styles.textBold,
                                            {
                                                color: '#fff',
                                                marginRight: 10,
                                            },
                                        ]}>
                                        {loading ? 'Please Wat...' : 'Change'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default ChangePin;

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
    body: {
        paddingTop: 15,
    },
    label: {
        color: '#545454',
        fontSize: 11,
        marginBottom: 6,
    },
    input: {
        height: 50,
        marginBottom: 20,
        shadowRadius: 1,
        shadowOpacity: 0.2,
        borderWidth: 1,
        borderRadius: 3,
        fontFamily: 'Inter-Regular',
        paddingLeft: 15,
        borderColor: '#545454',
    },
    btn: {
        backgroundColor: '#0037ba',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 20,
    },
    bottom: {
        marginTop: 10,
        marginBottom: 15,
    },
});
