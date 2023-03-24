import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

interface Props {
    clickModal: any;
}

const Filter: React.FC<Props> = ({clickModal}) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [bank, setBank] = useState('');

    return (
        <ScrollView>
            <View style={{paddingHorizontal: 20, flex: 1, paddingVertical: 15}}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Text style={[styles.text]}>Filter</Text>
                    <TouchableOpacity
                        style={styles.cancel}
                        onPress={clickModal}>
                        <Entypo name="cross" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={text => setName(text)}
                        placeholder="Customer's Name"
                    />

                    <Text style={[styles.label, {marginBottom: 10}]}>
                        Transaction Type:
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                        }}
                        onPress={() => setType('withdraw')}>
                        <View style={styles.radio}>
                            {type === 'withdraw' && (
                                <View style={styles.radio2} />
                            )}
                        </View>
                        <Text style={[styles.text, {marginLeft: 10}]}>
                            Card Withdrawal
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flexDirection: 'row', marginBottom: 20}}
                        activeOpacity={0.8}
                        onPress={() => setType('transfer')}>
                        <View style={styles.radio}>
                            {type === 'transfer' && (
                                <View style={styles.radio2} />
                            )}
                        </View>
                        <Text style={[styles.text, {marginLeft: 10}]}>
                            Transfer
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>Bank:</Text>
                    <TextInput
                        style={styles.input}
                        value={bank}
                        onChangeText={text => setBank(text)}
                        placeholder="Enter Bank to search"
                    />
                    <Text style={styles.label}>Amount:</Text>
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={text => setAmount(text)}
                        placeholder="Enter Amount to search"
                        keyboardType="number-pad"
                    />
                </View>
                <View
                    style={{
                        marginVertical: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                        <Text style={[styles.text, {color: '#0037ba'}]}>
                            Reset
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.btn, {backgroundColor: '#0037ba'}]}>
                        <Text style={[styles.text, {color: '#ffffff'}]}>
                            Apply
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Filter;

const styles = StyleSheet.create({
    cancel: {
        backgroundColor: '#0037ba',
        height: 20,
        width: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        color: '#000',
    },
    input: {
        height: 40,
        marginBottom: 20,
        shadowRadius: 1,
        shadowOpacity: 0.2,
        borderWidth: 1,
        borderRadius: 3,
        fontFamily: 'Inter-Regular',
        paddingLeft: 15,
        borderColor: '#BCC8DC',
    },
    label: {
        color: '#545454',
        fontSize: 11,
        marginBottom: 6,
    },
    radio: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#BCC8DC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radio2: {
        height: 12,
        width: 12,
        backgroundColor: '#BCC8DC',
        borderRadius: 6,
    },
    btn: {
        borderColor: '#0037ba',
        borderWidth: 1,
        width: '45%',
        alignItems: 'center',
        borderRadius: 15,
        paddingVertical: 5,
    },
});
