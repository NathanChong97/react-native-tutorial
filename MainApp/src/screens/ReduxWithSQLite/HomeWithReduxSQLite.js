import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Pressable,
    Alert,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import GlobalStyle from '../../utils/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyCustomButton from "../../utils/CustomButton";
import SQLite from 'react-native-sqlite-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setNameInActions, setAgeInActions, increaseAgeInActions, GET_CITIES, getCities } from '../../redux/actions';
import { FlatList } from 'react-native-gesture-handler';
import PushNotification from "react-native-push-notification";

const db = SQLite.openDatabase(
    {
        name: "MainDB",
        location: "default",
    },
    () => {},
    error => { console.log(error) }
);

export default function HomeWithReduxSQLite({navigation, route}) {
   
    const {name, age, cities} = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        getData(); 
        dispatch(getCities())
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
                            dispatch(setNameInActions(userName));
                            dispatch(setAgeInActions(userAge));
                        }
                    }
                )
            })
        } catch (error) {
            console.log("this shit is not showing");
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
                        "UPDATE Users SET Name=?, Age=?",
                        [name, age],
                        () => { Alert.alert("Success!", "Your data has been updated") },
                        error => { console.log(error) }
                    )   
                })
            } catch (error) {
                console.log("this shit is not showing");
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

    const handleNotifications = (item, index) => {
        PushNotification.cancelAllLocalNotifications();

        PushNotification.localNotification({
            channelId: "test-channel",
            title: "You clicked on " + item.country,
            message: item.city,
            bigText: item.city + " is one of the biggest and most beautiful cities in " + item.country,
            color: "red",
            id: index
        })

        //A schedule notification
        PushNotification.localNotificationSchedule({
            channelId: "test-channel",
            title: "Alarm",
            message: "You clicked on " + item.country + "20 seconds ago",
            date: new Date(Date.now() + 20 * 1000),
            allowWhileIdle: true, //notification will display if app in idle mode
        })
    }

    return (
        <View style={styles.body}>
            <Text style={[
                    GlobalStyle.CustomFont, 
                    styles.text
                ]}>Welcome {name} !
            </Text>
            <FlatList
                data={cities}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => { 
                            handleNotifications(item, index) 
                            navigation.navigate("Map", {
                                city: item.city,
                                lat: item.lat,
                                lng: item.lng,
                            })
                        }}
                    >
                        <View style={styles.item}>
                            <Text style={styles.title}>{item.country}</Text>
                            <Text style={styles.subtitle}>{item.city}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            {/* <Text style={[
                    GlobalStyle.CustomFont, 
                    styles.text
                ]}>Your age is {age}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={name}
                onChangeText={(value) => dispatch(setNameInActions(value))}
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
            <MyCustomButton
                title="Increase Age"
                color="#0080ff"
                onPressFunction={() => {dispatch(increaseAgeInActions())}}
            /> */}
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
     },
     item: {
        backgroundColor: "#ffffff",
        borderWidth: 2,
        borderColor: "#cccccc",
        borderRadius: 5,
        margin: 7,
        width: 350,
        justifyContent: "center",
        alignItems: "center"
     },
     title: {
        fontSize: 30,
        margin: 10
     },
     subtitle: {
        fontSize: 20,
        margin: 10,
        color: "#999999"
     }
});