import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer'

import Home from '../pages/Home'
import Profile from "../pages/Profile";
import New from "../pages/New";

const AppDrawer = createDrawerNavigator()


export default function AppRoutes() {
    return (

        <AppDrawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#171717',
                },
                drawerLabelStyle: {
                    fontWeight: "bold"
                },
                drawerActiveTintColor: '#FFF',
                drawerActiveBackgroundColor: '#00b94a',
                drawerInactiveBackgroundColor: '#000',
                drawerInactiveTintColor: '#DDD',
                drawerItemStyle: {
                    margin: 5
                }
            }}
        >

            <AppDrawer.Screen name="Home" component={Home}
                options={{ headerShown: false }}
            />


            <AppDrawer.Screen name="Profile" component={Profile}
                options={{ headerShown: false }}
            />

            <AppDrawer.Screen name="New" component={New}
                options={{ headerShown: false }}
            />
        </AppDrawer.Navigator>
    )
}