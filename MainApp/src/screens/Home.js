import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Pressable,
    Alert,
    TextInput,
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyCustomButton from "../utils/CustomButton";

export default function Home({navigation, route}) {
   
    const [name, setName] = useState('');
    const [age, setAge] = useState("");

    useEffect(() => {
        getData(); 
    }, []) //becuase useeEffect has empty brackets, getData() will only run once and it will run when screen starts

    const getData = () => {
        try {
            AsyncStorage.getItem("UserData")
                .then(value => {
                    if(value != null) {
                        let user = JSON.parse(value)
                        setName(user.Name);
                        setAge(user.Age)
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const updateData = async () => {
        if(name.length == 0) {
             Alert.alert('Warning', "Please enter all your user data")
        } else {
            try {
                var user = {
                    Name: name
                }
                // await AsyncStorage.setItem("UserData", name)
                await AsyncStorage.mergeItem("UserData", JSON.stringify(user)) //use mergeItem if you just want to update partial data
                Alert.alert("Success!", "Your data has been updated")
            } catch (error) {
                console.log(error);
            }
        }
    } 


    const removeData = async () => {
        if(name.length == 0) {
             Alert.alert('Warning', "Please enter your data")
        } else {
            try {
                await AsyncStorage.removeItem("UserData")
                navigation.navigate("Login")
            } catch (error) {
                console.log(error);
            }
        }
    } 


    return (
        <View style={styles.body}>
            <Text style={[
                    GlobalStyle.CustomFont, 
                    styles.text
                ]}>Welcome {name}
            </Text>
            <Text style={[
                    GlobalStyle.CustomFont, 
                    styles.text
                ]}>Your age is {age}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={name}
                onChangeText={(value) => setName(value)}
            />
            <MyCustomButton
                title="Update"
                color="#ff7f00"
                onPressFunction={updateData}
            />
             <MyCustomButton
                title="Remove"
                color="#f40100"
                onPressFunction={removeData}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        margin: 10
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: "#555",
        borderRadius: 5,
        backgroundColor: "#ffffff",
        textAlign: 'center',
        fontSize: 20,
        marginTop: 50,
        marginBottom: 10,
     }
});