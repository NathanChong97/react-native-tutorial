/* https://react-native-async-storage.github.io/async-storage/docs/install */

import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Alert,
} from 'react-native';
import MyCustomButton from "../utils/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginWithAsyncStorage({navigation}) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        getData(); 
    }, []) //becuase useeEffect has empty brackets, getData() will only run once and it will run when screen starts

    const getData = () => {
        try {
            AsyncStorage.getItem("UserData")
                .then(value => {
                    if(value != null) {
                        navigation.navigate("Home")
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const setData = async () => {
        if(name.length == 0 || age.length == 0) {
             Alert.alert('Warning', "Please enter your data")
        } else {
            try {
                var user = {
                    Name: name,
                    Age: age,
                }
                await AsyncStorage.setItem("UserData", JSON.stringify(user))
                navigation.navigate("Home");
            } catch (error) {
                console.log(error);
            }
        }
    } 

    return (
        <View style={styles.body}>
            <Image
                style={styles.logo}
                source={require("../../assets/async_storage_image.jpg")}
            />
            <Text style={styles.text}>Async Storage</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                onChangeText={(value) => setName(value)}
            />
             <TextInput
                style={styles.input}
                placeholder="Enter your age"
                onChangeText={(value) => setAge(value)}
            />
            <MyCustomButton
                title="Login"
                color="#1eb900"
                onPressFunction={setData}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0080ff'
    },
    logo: {
        width: 100,
        height: 100,
        margin: 10,
    },
    text: {
        fontSize: 30,
        color: "#ffffff",
        marginBottom: 50,
    },
     input: {
        width: 300,
        borderWidth: 1,
        borderColor: "#555",
        borderRadius: 5,
        backgroundColor: "#ffffff",
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
     }
})