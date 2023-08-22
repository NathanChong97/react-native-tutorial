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
import MyCustomButton from "../utils/CustomButton";
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: "MainDB",
        location: "default",
    },
    () => {},
    error => { console.log(error) }
);

export default function HomeWithSQLite({navigation, route}) {
   
    const [name, setName] = useState('');
    const [age, setAge] = useState("");

    useEffect(() => {
        getData(); 
    }, []) //becuase useeEffect has empty brackets, getData() will only run once and it will run when screen starts

    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, Age FROM Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length
                        if(len > 0) {
                            var userName = results.rows.item(0).Name
                            var userAge = results.rows.item(0).Age
                            setName(userName);
                            setAge(userAge);
                        }
                    }
                )
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
                db.transaction((tx) => {
                    tx.executeSql(
                        "UPDATE Users SET Name=?",
                        [name],
                        () => { Alert.alert("Success!", "Your data has been updated") },
                        error => { console.log(error) }
                    )   
                })
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
                db.transaction((tx) => {
                    tx.executeSql(
                        "DELETE FROM Users",
                        [],
                        () => { navigation.navigate("Login") },
                        error => { console.log(error) }
                    )
                })
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