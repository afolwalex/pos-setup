import {LogBox} from 'react-native';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import NavContainer from './src/navigation/NavContainer';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const persistor = persistStore(store);

const App = () => {
    useEffect(() => {
        RNBootSplash.hide();
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <NavContainer />
            </PersistGate>
        </Provider>
    );
};

export default App;
