import React,{useLayoutEffect, useState} from 'react'
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
import {Button,Input,Image} from "react-native-elements";
import {StatusBar} from "expo-status-bar";
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [imageUrl,setImageUrl]=useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
        headerBackTitle:"Back to login",
        });
    }, [navigation]);

    const register = () =>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName:name,
                photoUrl:imageUrl || 
                "https://i.ibb.co/gWJS7dm/download.png",
            });
        })
        // .catch((error))=>alert((error.message));
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar style="light"/>

         <Text h3 styles={{marginBottom:50}}>
                Create a Connect Account
          </Text>

          <View style={styles.inputContainer}>
              <Input 
                placeholder="Full Name" 
                autofocus 
                type="text" 
                value={name}
                onChangeText={(text) => setName(text)}
               />

               <Input 
                placeholder="Email" 
                type="email" 
                value={email}
                onChangeText={(text) => setEmail(text)}
               />

              <Input 
              placeholder="Password" 
              secureTextEntry 
              type="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              />

             <Input 
                placeholder="Profile Photo URL (optional)" 
                type="text" 
                value={imageUrl}
                onChangeText={(text) => setImageUrl(text)}
                onSubmitEditing={register}
               />



            </View>

        <Button 
            containerStyle={styles.button}
            raised
            onPress={register}
            title="Register" 
            />  
        </KeyboardAvoidingView>
    );
};


export default RegisterScreen;

const styles =StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white"
    },
    inputContainer:{
        width:300,
    },
    button:{
        width:200,
        marginTop:10,

    }
});

