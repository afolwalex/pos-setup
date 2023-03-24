import {ToastAndroid} from 'react-native';

const displayError = (error: any, yes: boolean) => {
    const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString();
    if (yes) {
        ToastAndroid.show(message, ToastAndroid.LONG);
    }
    return message;
};

export {displayError};
