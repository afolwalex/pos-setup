import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootNav';
import {useAppDispatch} from '../redux/hooks';
import {logout} from '../redux/basic/basicSlice';

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'Settings'>;
}

const Settings: React.FC<Props> = ({navigation}) => {
    const dispatch = useAppDispatch();

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
                                    {marginLeft: 10, fontSize: 15},
                                ]}>
                                Settings
                            </Text>
                        </TouchableOpacity>
                        <View style={{marginTop: 20}}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    navigation.navigate('ChangePin', {
                                        type: 'Lock',
                                    })
                                }
                                style={styles.btn}>
                                <AntDesign
                                    name="lock"
                                    size={20}
                                    color={'#000'}
                                />
                                <Text style={[styles.text, {marginLeft: 10}]}>
                                    Change Lock PIN
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    navigation.navigate('ChangePin', {
                                        type: 'Transaction',
                                    })
                                }
                                style={styles.btn}>
                                <AntDesign
                                    name="lock"
                                    size={20}
                                    color={'#000'}
                                />
                                <Text style={[styles.text, {marginLeft: 10}]}>
                                    Change Transaction PIN
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => dispatch(logout())}
                                style={styles.btn}>
                                <AntDesign
                                    name="logout"
                                    size={18}
                                    color={'#000'}
                                />
                                <Text style={[styles.text, {marginLeft: 10}]}>
                                    Log Out
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default Settings;

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
        color: '#000',
    },
    textBold: {
        fontFamily: 'Inter-Bold',
        fontSize: 13,
        color: '#000',
    },
    btn: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.09)',
        backgroundColor: '#F4F4F6',
        paddingVertical: 12,
        paddingLeft: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
