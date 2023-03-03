import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import NavContainer from './src/navigation/NavContainer';

const App = () => {
    useEffect(() => {
        RNBootSplash.hide({fade: true});
    }, []);

    return <NavContainer />;
};

export default App;
