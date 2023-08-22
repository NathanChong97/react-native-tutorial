import React from 'react';
import {
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeWithSQLite from './screens/HomeWithSQLite';
import LoginWithAsyncStorage from './screens/LoginWithAsyncStorage';
import LoginWithSQLite from './screens/LoginWithSQLite';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();

export default function LoginScreenComponent() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Login'
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: "#0080ff"
                    },
                    headerTintColor: "#ffffff",
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold'
                    }
                }}
            >
                {/* <Stack.Screen
                    name="Login"
                    component={LoginWithAsyncStorage}
                    options={{
                        headerShown: false,
                    }}
                /> */}
                   {/* <Stack.Screen
                    name="Home"
                    component={Home}
                    initialParams={{ItemName: "Item from Drawer", ItemId: 2}}
                /> */}
                 <Stack.Screen
                    name="Login"
                    component={LoginWithSQLite}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeWithSQLite}
                    initialParams={{ItemName: "Item from Drawer", ItemId: 2}}
                />
             
            </Stack.Navigator>
        </NavigationContainer>
    )
}
