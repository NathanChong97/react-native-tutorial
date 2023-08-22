import React from 'react';
import {
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeWithReduxSQLite from './HomeWithReduxSQLite';
import LoginWithReduxSQLite from './LoginWithReduxSQLite';
import Map from './Map';
import { Provider } from 'react-redux';
import { Store } from '../../redux/store'; 

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();

export default function AppWithReduxSQLite() {
    return (
        <Provider store={Store}>
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
                    <Stack.Screen
                        name="Login"
                        component={LoginWithReduxSQLite}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={HomeWithReduxSQLite}
                        initialParams={{ItemName: "Item from Drawer", ItemId: 2}}
                    />
                    <Stack.Screen
                        name='Map'
                        component={Map}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}
