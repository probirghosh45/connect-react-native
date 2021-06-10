import React,{useState,useEffect} from 'react'
import {StyleSheet,View, Text, KeyboardAvoidingView} from 'react-native';
import {Button,Input,Image} from "react-native-elements";
import {StatusBar} from "expo-status-bar";
import { auth } from '../firebase';


const LoginScreen = ({navigation}) => {

    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");

    useEffect(() => {
        const unsubscribe=auth.onAuthStateChanged((authUser)=> {
           console.log(authUser);
            
            if(authUser){
                navigation.replace('Home');
            }
        });

       return unsubscribe ;
       

    }, [])

    const signIn = () =>{
      auth.signInWithEmailAndPassword(email,password)
      .catch((error)=>alert(error));  
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light"/>
            <Image 
            source={{
                uri: "https://i.ibb.co/gWJS7dm/download.png"
            }} 
            
            style={{width:200, height:200}}
            />
            {/* <Text>This is Login Screen</Text> */}
            
            <View style={styles.inputContainer}>
              <Input 
                placeholder="Email" 
                autoFocus 
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
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />        
            <Button 
            onPress={()=>navigation.navigate("Register")}
            containerStyle={styles.button} 
            type="outline" 
            title="Register" /> 
            <View style={{height:100}}/>

        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
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
