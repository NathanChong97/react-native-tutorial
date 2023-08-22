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
import MyCustomButton from "../../utils/CustomButton";
import SQLite from 'react-native-sqlite-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setNameInActions, setAgeInActions } from '../../redux/actions';
import PushNotification from "react-native-push-notification";

const db = SQLite.openDatabase(
    {
        name: "MainDB",
        location: "default",
    }, 
    () => {},
    error => { console.log(error) }
);

export default function LoginWithReduxSQLite({navigation}) {
    const {name, age} = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        createTable();
        getData(); 
        createChannels();
    }, []) //becuase useeEffect has empty brackets, getData() will only run once and it will run when screen starts

    const createTable = () => {
        db.transaction((tx) => {
            //there must be space after exist and users because this is sting concat
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
            )
        })
    }

    const createChannels = () => {
        PushNotification.createChannel(
            {
                channelId: "test-channel",
                channelName: "Test Channel"
            }
        )
    } 

    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, Age FROM Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length
                        console.log("show something")
                        if(len > 0) {
                            navigation.navigate("Home");
                        }
                    }
                )
            })
        } catch (error) {
            console.log("show some error")
            console.log(error);
        }
    }

const setData = async () => {
        if(name.length == 0 || age.length == 0) {
             Alert.alert('Warning', "Please enter your data")
        } else {
            try {
                dispatch(setNameInActions(name));
                dispatch(setAgeInActions(age));
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
                source={require("../../../assets/redux.png")}
            />
            <Text style={styles.text}>Redux</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                onChangeText={(value) => dispatch(setNameInActions(value))}
            />
             <TextInput
                style={styles.input}
                placeholder="Enter your age"
                onChangeText={(value) => dispatch(setAgeInActions(value))}
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