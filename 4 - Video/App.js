import { Text, View, Button, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import useNotification from './src/hooks/useNotification';
import { Home, Login } from './src/screens';
import React, { useState } from "react"

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

    const [handleScreen, setHandleScreen] = useState(true)

    const expoPushToken = useNotification()

    return (
        <SafeAreaView style={styles.container}>
            {handleScreen ?
                <Login setHandleScreen={setHandleScreen} expoPushToken={expoPushToken} />
                :
                <Home />
            }


        </SafeAreaView>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
})