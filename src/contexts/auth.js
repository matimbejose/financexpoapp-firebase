import React, { useState, createContext, useEffect} from "react";
import firebase from '../services/firebaseConnection'
import AsyncStorage from "@react-native-community/async-storage";
export const AuthContext = createContext({})


export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)



    //vericar se ha nada no user 
    useEffect(()=> {
         async function loadStorege() {
            const storegeUser = await AsyncStorage.getItem('Auth_user')

            if(storegeUser) {
                setUser(JSON.parse(storegeUser))
                setLoading(true)
            }
            setLoading(false)
         }

         loadStorege()
    }, [])

    //login user
    async function signIn(email, password) {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid  = value.user.uid;

            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid: uid,
                    nome: snapshot.val().nome,
                    email: value.user.email
                }
                setUser(data)
                storegeUser(data)
            })
        })
        .catch((error) => {
            alert(error.code)
        })
    }

    // // create new user
    async function signUp(email, password, nome){
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async (value)=>{
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome
            })
            .then(()=>{
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                };
                setUser(data);
                storegeUser(data)
            })
        })
        .catch((error) => {
            alert(error.code)
        })
    }


    //save data in AsyncStorage
    async function storegeUser(data) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
    }


    //logout the user
    async function signOut() {
        await firebase.auth().signOut()

        await AsyncStorage.clear()
        .then( () => {
            setUser(null)
        })
    }

    return(

        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, loading, signOut }}>
            { children }
        </AuthContext.Provider>     
 )

}