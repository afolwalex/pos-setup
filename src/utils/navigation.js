import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    } else {
        console.log('Navigation Error');
    }
}

export function reset(name) {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            index: 0,
            routes: [{name}],
        });
    }
}

export function deeperLink(name, params, screen) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, {screen, params});
    }
}
