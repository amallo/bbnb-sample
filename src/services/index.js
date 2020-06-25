import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification"

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
});

export async function requestFcmUserPermission() {
    const { AuthorizationStatus } = messaging
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;

    return enabled
}

export async function registerFcm() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get and return the token
    const token = await messaging().getToken();
    return token
}


export const login = (email, password) => {
    return fetch('https://bbnb-booking.now.sh/api/users/signIn', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then((response) => {
            // Si un code erreur a été détecté on déclenche une erreur
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
}

export const localNotification = ({ title, message }) => {
    PushNotification.localNotification({
        title,
        message
    })
}

export const scheduleLocalNotification = ({ title, message, date }) => {
    PushNotification.localNotificationSchedule({
        title,
        message,
        date
    })
}