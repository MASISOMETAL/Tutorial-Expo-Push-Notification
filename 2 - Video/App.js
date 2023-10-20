import { Text, View, Button, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import useNotification from './src/hooks/useNotification';
import { Home, Login } from './src/screens';
import React from "react"

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Test Push Notification',
        body: 'Estamos Testeando las notificaciones de Expo Push Token',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

const App = () => {

    const expoPushToken = useNotification()

    console.log("Este es mi hook", expoPushToken)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Button
                title="Press to Send Notification"
                onPress={async () => {
                    await sendPushNotification(expoPushToken);
                }}
            />
        </View>
    );
}

export default App;
