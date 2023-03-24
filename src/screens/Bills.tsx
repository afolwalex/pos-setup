import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootNav';
import AntDesign from 'react-native-vector-icons/AntDesign';
import bills from '../data/bills';
import {Image} from 'react-native';

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'Bills'>;
    route: RouteProp<RootStackParamList, 'Bills'>;
}

const Bills: React.FC<Props> = ({navigation, route}) => {
    const params = route.params ? route.params.type : null;

    const listBill = params ? (params === 'Airtime' ? bills[0].list : []) : [];

    useEffect(() => {
        if (!params) {
            navigation.navigate('Dashboard');
        }
    }, [params]);

    return (
        <View style={{flex: 1, backgroundColor: '#0037ba'}}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {params && (
                        <View style={{flex: 1}}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                }}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => navigation.goBack()}>
                                    <AntDesign
                                        name="arrowleft"
                                        color={'#000'}
                                        size={20}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={[
                                        styles.textBold,
                                        {marginLeft: 10, fontSize: 15},
                                    ]}>
                                    {params}
                                </Text>
                            </View>
                            <View style={{marginTop: 20}}>
                                {listBill.map(bill => (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        key={bill.id}
                                        style={styles.card}>
                                        <Image
                                            source={
                                                bill.name === 'Glo'
                                                    ? require('../assets/glo.png')
                                                    : bill.name === 'Airtel'
                                                    ? require('../assets/airtel.png')
                                                    : bill.name === '9mobile'
                                                    ? require('../assets/9mobile.png')
                                                    : bill.name === 'MTN'
                                                    ? require('../assets/mtn.png')
                                                    : require('../assets/glo.png')
                                            }
                                        />
                                        <Text
                                            style={[
                                                styles.text,
                                                {marginLeft: 15},
                                            ]}>
                                            {bill.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

export default Bills;

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
    card: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#F4F4F6',
        paddingHorizontal: 10,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 5,
    },
});
