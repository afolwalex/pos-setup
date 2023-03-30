import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ImageBackground} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Balance from '../components/TransactionDetails/Balance';
import {ScrollView} from 'react-native';
import {RootStackParamList} from '../navigation/RootNav';
import Detail from '../components/TransactionDetails/Detail';
import Filter from '../components/TransactionDetails/Filter';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'TransactionDetails'>;
}

const TransactionDetails: React.FC<Props> = ({navigation}) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <View style={{flex: 1}}>
            <ImageBackground
                source={require('../assets/bg-home.png')}
                resizeMode="stretch"
                style={{width: '100%', height: '100%'}}>
                <View
                    style={{
                        height: 150,
                        paddingHorizontal: 15,
                        paddingVertical: 20,
                    }}>
                    <Balance
                        navigation={navigation}
                        click={() => navigation.navigate('Analytics')}
                    />
                </View>
                <View style={styles.whiteBg}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: 10,
                                }}>
                                <Text style={[styles.textBold]}>
                                    Transactions
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.filter}
                                    onPress={() => setOpenModal(!openModal)}>
                                    <Text
                                        style={[
                                            styles.text,
                                            {
                                                color: '#545454',
                                                fontSize: 11,
                                                marginRight: 4,
                                            },
                                        ]}>
                                        Filter
                                    </Text>
                                    <AntDesign
                                        name="filter"
                                        size={15}
                                        color="#545454"
                                    />
                                </TouchableOpacity>
                            </View>
                            <Detail />
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
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
                        <Filter clickModal={() => setOpenModal(!openModal)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default TransactionDetails;

const styles = StyleSheet.create({
    whiteBg: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    text: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
    },
    textBold: {
        fontFamily: 'Inter-Bold',
        fontSize: 13,
        color: '#545454',
    },
    modalView: {
        backgroundColor: '#fff',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        height: '90%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    filter: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#545454',
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 10,
    },
});
