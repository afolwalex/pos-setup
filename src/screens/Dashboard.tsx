import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon1 from '../assets/ic_outline-live-tv.svg';
import Icon2 from '../assets/icon-park-outline_bill.svg';
import Icon3 from '../assets/healthicons_electricity-outline.svg';
import Icon4 from '../assets/octicon_log-16.svg';
import Icon5 from '../assets/fluent-mdl2_money.svg';
import Icon6 from '../assets/fluent_sport-soccer-20-filled.svg';
import {RootStackParamList} from '../navigation/RootNav';
import {useAppSelector} from '../redux/hooks';

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'Dashboard'>;
}

const Dashboard: React.FC<Props> = ({navigation}) => {
    const [showAccount, setShowAccount] = useState(true);

    const {agent_details} = useAppSelector(state => state.basic);

    useEffect(() => {
        // if (agent_details.requires_pin_change) {
        //     navigation.navigate('ChangePin', {type: 'lock'});
        // }
    }, []);

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
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <FontAwesome5
                                name="user"
                                size={12}
                                color="#000"
                                style={styles.profile}
                            />
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        color: '#fff',
                                        fontSize: 12,
                                        marginLeft: 6,
                                    },
                                ]}>
                                {agent_details.business_name}
                            </Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Settings')}>
                                <AntDesign
                                    name="setting"
                                    size={22}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    navigation.navigate('TransactionDetails')
                                }
                                style={{marginLeft: 12}}>
                                <FontAwesome5
                                    name="bell"
                                    size={22}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 30,
                        }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setShowAccount(!showAccount)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={[
                                    styles.textBold,
                                    {
                                        color: '#fff',
                                        fontSize: 20,
                                        marginRight: 8,
                                    },
                                ]}>
                                {showAccount
                                    ? agent_details.account_number
                                    : '0000000000'}
                            </Text>
                            <Feather
                                name={showAccount ? 'eye' : 'eye-off'}
                                color={'#fff'}
                                size={16}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontFamily: 'Inter-Light',
                                color: '#fff',
                                fontSize: 10,
                                marginTop: 5,
                            }}>
                            Your Account Number
                        </Text>
                    </View>
                </View>
                <View style={styles.whiteBg}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 30,
                            }}>
                            <Text style={styles.text}>Transaction</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: 10,
                                }}>
                                <TouchableOpacity
                                    style={styles.tranBtn}
                                    onPress={() =>
                                        navigation.navigate('Transfer')
                                    }
                                    activeOpacity={0.8}>
                                    <Ionicons
                                        name="ios-arrow-redo-circle"
                                        color="#0D6C15"
                                        style={styles.tranIcon}
                                        size={18}
                                    />
                                    <Text
                                        style={[
                                            styles.textBold,
                                            {
                                                color: '#fff',
                                                fontSize: 13,
                                                marginTop: 10,
                                            },
                                        ]}>
                                        Transfer
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.tranBtn}
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        navigation.navigate('Withdraw')
                                    }>
                                    <Ionicons
                                        name="ios-arrow-undo-circle"
                                        color="#DD3A23"
                                        style={styles.tranIcon}
                                        size={20}
                                    />
                                    <Text
                                        style={[
                                            styles.textBold,
                                            {
                                                color: '#fff',
                                                fontSize: 13,
                                                marginTop: 10,
                                            },
                                        ]}>
                                        Card Withdrawal
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.text, {marginVertical: 10}]}>
                                Bills
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 15,
                                }}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        navigation.navigate('Bills', {
                                            type: 'Cable TV',
                                        })
                                    }
                                    style={[
                                        styles.others,
                                        {
                                            backgroundColor:
                                                'rgba(92, 30, 155, 0.1)',
                                        },
                                    ]}>
                                    <Icon1 />
                                    <Text
                                        style={[
                                            styles.textBold,
                                            {
                                                fontSize: 14,
                                                marginTop: 5,
                                                color: '#5C1E9B',
                                            },
                                        ]}>
                                        Cable TV
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        navigation.navigate('Bills', {
                                            type: 'Airtime',
                                        })
                                    }
                                    style={[
                                        styles.others,
                                        {
                                            backgroundColor:
                                                'rgba(13, 108, 21, 0.1)',
                                        },
                                    ]}>
                                    <Icon2 />
                                    <Text
                                        style={[
                                            styles.textBold,
                                            {
                                                fontSize: 14,
                                                marginTop: 5,
                                                color: '#0D6C15',
                                            },
                                        ]}>
                                        Airtime
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 15,
                                }}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        navigation.navigate('Bills', {
                                            type: 'Electricity',
                                        })
                                    }
                                    style={[
                                        styles.others,
                                        {
                                            backgroundColor:
                                                'rgba(135, 24, 34, 0.1)',
                                        },
                                    ]}>
                                    <Icon3 />
                                    <Text
                                        style={[
                                            styles.textBold,
                                            {
                                                fontSize: 14,
                                                marginTop: 5,
                                                color: '#871822',
                                            },
                                        ]}>
                                        Electricity
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        navigation.navigate('Bills', {
                                            type: 'Sports Betting',
                                        })
                                    }
                                    style={[
                                        styles.others,
                                        {
                                            backgroundColor:
                                                'rgba(96, 76, 246, 0.1)',
                                        },
                                    ]}>
                                    <Icon6 />
                                    <Text
                                        style={[
                                            styles.textBold,
                                            {
                                                fontSize: 14,
                                                marginTop: 5,
                                                color: '#604CF6',
                                            },
                                        ]}>
                                        Sports Betting
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.text, {marginVertical: 10}]}>
                                Quick Links
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 15,
                                }}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        navigation.navigate('CardBalance')
                                    }
                                    style={[
                                        styles.others,
                                        {
                                            backgroundColor:
                                                'rgba(125, 133, 39, 0.1)',
                                        },
                                    ]}>
                                    <Icon5 />
                                    <Text
                                        style={[
                                            styles.textBold,
                                            {
                                                fontSize: 14,
                                                marginTop: 5,
                                                color: '#7D8527',
                                            },
                                        ]}>
                                        Card Balance
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[
                                        styles.others,
                                        {
                                            backgroundColor:
                                                'rgba(221, 58, 35, 0.1)',
                                        },
                                    ]}>
                                    <Icon4 />
                                    <Text
                                        style={[
                                            styles.textBold,
                                            {
                                                fontSize: 14,
                                                marginTop: 5,
                                                color: '#DD3A23',
                                            },
                                        ]}>
                                        Log Dispute
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
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
    profile: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 50,
    },
    whiteBg: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    tranBtn: {
        backgroundColor: '#0037ba',
        width: '48%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 17,
        borderRadius: 4,
    },
    tranIcon: {
        backgroundColor: '#fff',
        marginRight: 5,
        padding: 4,
        borderRadius: 15,
    },
    others: {
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
    },
});
