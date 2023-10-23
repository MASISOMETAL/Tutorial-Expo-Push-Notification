import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { RTDatabase } from '../contants/Firebase'

const Login = ({setHandleScreen, expoPushToken}) => {

    const [correo, setCorreo] = useState("")
    const [pass, setPass] = useState("")

    const handleSubmit = async () => {
        try {
            await fetch(`${RTDatabase}/info.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo: correo,
                    pass: pass,
                    notificationToken: expoPushToken
                })
            })
            setHandleScreen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Login</Text>
            <TextInput
                style={styles.input}
                value={correo}
                onChangeText={setCorreo}
            />
            <TextInput
                style={styles.input}
                value={pass}
                onChangeText={setPass}
            />
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text>Registrarse</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    input: {
        marginTop: 10,
        borderWidth: 1,
        width: "80%",
        borderRadius: 7,
        height: 40,
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 10,
        width: "80%",
        height: 40,
        backgroundColor: "#ccc"
    }
})