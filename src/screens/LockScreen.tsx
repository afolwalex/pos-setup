import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Logo from '../assets/logo.svg';
import Welcome from '../assets/welcome.svg';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Modal} from 'react-native';
import {TextInput} from 'react-native';
import {RootStackParamList} from '../navigation/RootNav';

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'LockScreen'>;
}

const LockScreen: React.FC<Props> = ({navigation}) => {
    const [openModal, setOpenModal] = useState(false);
    const [pin, setPin] = useState('');
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [loader, setLoader] = useState(false);

    const unlockHandler = () => {
        if (pin.length === 4) {
            setLoader(true);
            setOpenModal(false);

            setTimeout(() => {
                setLoader(false);
                setPin('');
                navigation.navigate('Dashboard');
            }, 3000);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Logo height={30} />
                <Text
                    style={[
                        styles.text,
                        {width: '70%', textAlign: 'center', marginTop: 10},
                    ]}>
                    Enjoy seamless and stress-free transactions
                </Text>
            </View>
            <View style={styles.image}>
                <Welcome height={'100%'} />
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn}
                    onPress={() => setOpenModal(!openModal)}>
                    <Text
                        style={[styles.text, {color: '#fff', marginRight: 10}]}>
                        Unlock
                    </Text>
                    {loader ? (
                        <ActivityIndicator color="#fff" size={20} />
                    ) : (
                        <EvilIcons name="arrow-right" color="#fff" size={20} />
                    )}
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={openModal}
                onRequestClose={() => {}}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#000000AA',
                    }}>
                    <View style={styles.modalView}>
                        <View style={styles.inputField}>
                            <Text style={[styles.text, {marginVertical: 20}]}>
                                Enter your 4 digit PIN to unlock
                            </Text>
                            <View
                                style={{
                                    position: 'relative',
                                    width: '50%',
                                }}>
                                <TextInput
                                    value={pin}
                                    onChangeText={text => setPin(text)}
                                    style={styles.input}
                                    keyboardType="number-pad"
                                    secureTextEntry={true}
                                    maxLength={4}
                                    showSoftInputOnFocus={showKeyboard}
                                    onSubmitEditing={unlockHandler}
                                    autoFocus={true}
                                />
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        setShowKeyboard(!showKeyboard)
                                    }
                                    style={styles.pos}>
                                    <Entypo
                                        name="keyboard"
                                        size={20}
                                        color="#000"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.cancel}
                            activeOpacity={0.8}
                            onPress={() => setOpenModal(false)}>
                            <Entypo name="cross" color="#fff" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default LockScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    head: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        color: '#000',
    },
    btn: {
        backgroundColor: '#0037ba',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 20,
    },
    modalView: {
        backgroundColor: '#fff',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 20,
    },
    input: {
        borderBottomColor: 'rgba(0,0,0,0.4)',
        borderBottomWidth: 1,
        textAlign: 'center',
        fontSize: 30,
        width: '100%',
    },
    inputField: {alignItems: 'center'},
    pos: {
        position: 'absolute',
        right: 10,
        top: 20,
    },
    cancel: {
        backgroundColor: '#0037ba',
        height: 40,
        width: 40,
        position: 'absolute',
        bottom: 15,
        right: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
