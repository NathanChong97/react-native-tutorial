/* https://github.com/andpor/react-native-sqlite-storage */
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
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: "MainDB",
        location: "default",
    }, 
    () => {},
    error => { console.log(error) }
);

export default function LoginWithSQLite({navigation}) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        createTable();
        getData(); 
    }, []) //becuase useeEffect has empty brackets, getData() will only run once and it will run when screen starts

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS"
                + "Users"
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
            )
        })
    }

    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, Age FROM Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length
                        if(len > 0) {
                            navigation.navigate("Home");
                        }
                    }
                )
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
                await db.transaction(async (tx) => {
                    // await tx.executeSql(
                    //     "INSERT INTO Users (Name, Age) VALUES (' "+name+", "+age+" ')"
                    // );

                    //this is same as above executeSql code, its an alternative way of writing
                    await tx.executeSql(
                        "INSERT INTO Users (Name, Age) VALUES (?,?)",
                        [name, age] 
                    );
                })
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
                source={require("../../assets/sql_lite_image.jpg")}
            />
            <Text style={styles.text}>SQLite Storage</Text>
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