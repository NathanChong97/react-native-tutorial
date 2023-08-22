import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ScreenA from './screens/ScreenA';
import ScreenB from './screens/ScreenB';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MaterialBtmTab = createMaterialBottomTabNavigator();
const MaterialTopTab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

function StackNavigationComponent() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                // screenOptions={{
                //     header: () => null 
                // }}
            >
                <Stack.Screen
                    name="Screen_A"
                    component={ScreenA}
                    //this option set its header to null
                    //or use screenOptions commented above to hide all header
                    options={{
                        header: () => null
                    }}
                />
                <Stack.Screen
                    name="Screen_B"
                    component={ScreenB}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function BottomNavigationComponent() {
    return (
        <NavigationContainer>
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, size, color}) => {
                    let iconName;
                    if(route.name === "Screen_A") {
                        iconName = "autoprefixer"
                        size = focused ? 25 : 15
                        // color = focused ? "#00f" : "#555"
                    } else if(route.name === "Screen_B") {
                        iconName = "btc"
                        size = focused ? 25 : 15
                        // color = focused ? "#00f" : "#555"
                    }
                    return (
                        <FontAwesome5
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    )
                },
                tabBarActiveTintColor: "#f0f",
                tabBarInactiveTintColor: "#555",
                tabBarActiveBackgroundColor: "#555",
                tabBarInactiveBackgroundColor: "#fff",
                tabBarShowLabel: true,
                tabBarLabelStyle: {fontSize: 14},
            })}
        >
            <Tab.Screen
                name="Screen_A"
                component={ScreenA}
                //this option set its header to null (no more top navigation bar)
                //or use screenOptions commented above to hide all header
                options={{
                    tabBarBadge: 3,
                    header: () => null,
                }}
            />
            <Tab.Screen
                name="Screen_B"
                component={ScreenB}
            />
        </Tab.Navigator>
    </NavigationContainer> 
    )
}


function MaterialBottomNavigationComponent() {
    return (
        <NavigationContainer>
        <MaterialBtmTab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, size, color}) => {
                    let iconName;
                    if(route.name === "Screen_A") {
                        iconName = "autoprefixer"
                        size = focused ? 25 : 15
                        // color = focused ? "#00f" : "#555"
                    } else if(route.name === "Screen_B") {
                        iconName = "btc"
                        size = focused ? 25 : 15
                        // color = focused ? "#00f" : "#555"
                    }
                    return (
                        <FontAwesome5
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    )
                },
                tabBarActiveTintColor: "#f0f",
                tabBarInactiveTintColor: "#555",
                tabBarActiveBackgroundColor: "#555",
                tabBarInactiveBackgroundColor: "#fff",
                tabBarShowLabel: true,
                tabBarLabelStyle: {fontSize: 14},
            })}
        >
            <MaterialBtmTab.Screen
                name="Screen_A"
                component={ScreenA}
                //this option set its header to null (no more top navigation bar)
                //or use screenOptions commented above to hide all header
                options={{
                    tabBarBadge: 3,
                    header: () => null,
                }}
            />
            <MaterialBtmTab.Screen
                name="Screen_B"
                component={ScreenB}
            />
        </MaterialBtmTab.Navigator>
    </NavigationContainer> 
    )
}

function MaterialTopNavigationComponent() {
    return (
        <NavigationContainer>
        <MaterialTopTab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, size, color}) => {
                    let iconName;
                    if(route.name === "Screen_A") {
                        iconName = "autoprefixer"
                        size = focused ? 25 : 15
                        // color = focused ? "#00f" : "#555"
                    } else if(route.name === "Screen_B") {
                        iconName = "btc"
                        size = focused ? 25 : 15
                        // color = focused ? "#00f" : "#555"
                    }
                    return (
                        <FontAwesome5
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    )
                },
                tabBarActiveTintColor: "#f0f",
                tabBarInactiveTintColor: "#555",
                tabBarActiveBackgroundColor: "#555",
                tabBarInactiveBackgroundColor: "#fff",
                tabBarShowLabel: true,
                tabBarLabelStyle: {fontSize: 14},
            })}
        >
            <MaterialTopTab.Screen
                name="Screen_A"
                component={ScreenA}
                //this option set its header to null (no more top navigation bar)
                //or use screenOptions commented above to hide all header
                options={{
                    header: () => null,
                }}
            />
            <MaterialTopTab.Screen
                name="Screen_B"
                component={ScreenB}
            />
        </MaterialTopTab.Navigator>
    </NavigationContainer> 
    )
}

function DrawerNavigationComponent() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName='Screen_A'
                drawerPosition="left"
                drawerType="front"
                edgeWidth={100}
                hideStatusBar={false}
                overlayColor="#00000090"
                drawerStyle={{
                    backgroundColor: "#e6e6e6",
                    width: 250
                }}
                screenOptions={{
                    headerShown: true,
                    swipeEnabled: true,
                    gestureEnabled: true,
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
                <Drawer.Screen
                    name="Screen_A"
                    component={ScreenA}
                    options={{
                        title: "Screen_A_La",
                        drawerIcon: ({focused}) => (
                            <FontAwesome5
                                name="autoprefixer"
                                size={focused ? 25 : 20}
                                color={focused ? "#0080ff" : "#999999"}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Screen_B"
                    component={ScreenB}
                    options={{
                        title: "Screen_B_La",
                        drawerIcon: ({focused}) => (
                            <FontAwesome5
                                name="btc"
                                size={focused ? 25 : 20}
                                color={focused ? "#0080ff" : "#999999"}
                            />
                        )
                    }}
                    initialParams={{ItemName: "Item from Drawer", ItemId: 2}}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerNavigationComponent;