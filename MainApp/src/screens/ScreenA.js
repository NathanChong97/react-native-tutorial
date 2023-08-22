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


export default function ScreenA({navigation, route}) {
    const onPressHandler = () => {
        //remmeber to set InitialParams for ScreenB in NavigationTutorial to set initial value incase access via drawer
        navigation.navigate("Screen_B", {ItemName: "Item from Screen A", ItemId: 3});

        //this means screen A will not be in the back stack
        // navigation.replace("Screen_B"); 
    }

    const onPressHandler2 = () => {
        // navigation.openDrawer();
        navigation.toggleDrawer();
    }

    return (
        <View style={styles.body}>
            <Text style={[
                    GlobalStyle.CustomFont, 
                    styles.text
                ]}>Screen A</Text>
            <Pressable
                onPress={onPressHandler}
                style={({pressed}) => ({backgroundColor : pressed ? "#ddd" : "#0f0"})}
            >
                <Text style={GlobalStyle.ButtonStyles}>Go to Screen B</Text>
            </Pressable>

            <Pressable
                onPress={onPressHandler2}
                style={({pressed}) => ({backgroundColor : pressed ? "#ddd" : "#0f0", margin: 10})}
            >
                <Text style={GlobalStyle.ButtonStyles}>Toggle Drawer</Text>
            </Pressable>

            <Text style={styles.text}>{route.params?.Message}</Text>
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
        margin: 10
    }
});