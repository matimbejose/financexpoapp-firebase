import React from "react";

import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../pages/SignIn'
import SignUp from "../pages/SignUp";



const AuthStack  = createStackNavigator()


export default function AuthRoutes() {
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />

            <AuthStack.Screen 
            name="SignUp" 
            component={SignUp} 
            options={{

                headerStyle:{
                    backgroundColor: '#131313',
                    borderBottomWidth:1,
                    borderBottomColor:'#00b94a'
                },
                headerTintColor: '#FFF',
                headerBackTitleVisible:  false,
                headerTitle: 'Voltar'



            }}
            />
        </AuthStack.Navigator>
    )
}