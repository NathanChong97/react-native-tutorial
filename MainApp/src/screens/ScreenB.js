import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Pressable,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GlobalStyle from '../utils/GlobalStyle';

//"route" props is used to get the param from another screen 
export default function ScreenB({navigation, route}) {

    const {ItemId, ItemName} = route.params;

    const onPressHandler = () => {
        navigation.navigate("Screen_A", {Message: "This message is from Screen B"})
        // navigation.goBack()
    }

    const updatePropValue = () => {
        navigation.setParams({ItemId: 14});
    }

    return (
        <View style={styles.body}>
            <Text style={[
                    GlobalStyle.CustomFont,
                    styles.text
                ]}>Screen B</Text>
            <Pressable
                onPress={onPressHandler}
                style={({pressed}) => ({backgroundColor : pressed ? "#ddd" : "#0f0"})}
            >
                <Text style={GlobalStyle.ButtonStyles}>Go back</Text>
            </Pressable>

            <Pressable
                onPress={updatePropValue}
                style={({pressed}) => ({backgroundColor : pressed ? "#ddd" : "#0f0", margin: 10})}
            >
                <Text style={styles.text}>Update Prop Value</Text>
            </Pressable>

            <Text style={styles.text2}>Item ID: {ItemId}</Text>
            <Text style={styles.text2}>Item Name: {ItemName}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        margin: 10,
    },
    text2: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    }
});