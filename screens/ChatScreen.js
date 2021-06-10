import React ,{useState, useLayoutEffect}from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View,TouchableWithoutFeedback,ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import {AntDesign,FontAwesome,Ionicons} from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from "firebase";
import { db,auth } from '../firebase';
const ChatScreen = ({navigation,route}) => {
    
    const {input,setInput}=useState("");
    const {messages,setMessages}=useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Chat",
            headerBackTitleVisible:"false",
            headerTitleAlign:"left",
            headerTitle:()=>{
                <View>
                    styles={{
                        flexDirection:"row",
                        alignItems:"center"
                    }}

                    <Avatar
                    rounder
                    source={{
                        uri: "https://i.ibb.co/gWJS7dm/download.png"
                    }}
                    />
                    <Text style={{color:"white",marginLeft:10,
                    fontWeight:"700"}}>{route.params.chatName}</Text>
                </View>
            },

            headerLeft:()=>{
                <TouchableOpacity
                style={{marginLeft:10}}
                onPress={navigation.goBack}
                
                >
                  <AntDesign name="arrowLeft" size={24} color="white" />
                </TouchableOpacity>
            },

            headerRight:()=>{
                
             <View>

                 style={{
                     flexDirection:"row",
                     justifyContent:"space-between",
                     width:80,
                     marginRight:20,
                 }}
              <TouchableOpacity
                    style={{marginLeft:10}}
                    onPress={navigation.goBack}
                    
                    >
                 <AntDesign name="arrowLeft" size={24} color="white" />
               </TouchableOpacity>
               <TouchableOpacity>
                   <Ionicons name="call" size={24} color="white"/>
               </TouchableOpacity>
             </View>
            }            
           
        })
    }, [navigation]);

    const sendMessage =()=>{
      keyboard.dismiss();

      db.collection('chat').doc(route.params.id).collection('message').add({
          timestamp:firebase.firestore.FireValue.serverTimestamp(),
          message:input,
          displayName:auth.currentUser.displayName,
          email:auth.currentUser.email,
          photoURL:auth.currentUser.photoURL
      })
      setInput('')
    };

     useLayoutEffect(() => {
      
        const unsubscribe =db
        .collection('chats')
        .doc(route.params.id)
        .collection("messages")
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>setMessages(
            snapshot.docs.map(doc=>({
               id:doc.id,
               data:doc.data(),
            }))
        ));

        return unsubscribe;

     }, [route])


    return (
        <SafeAreaView 
            style={{
             flex:1,
             backgroundColor:"white"
            }}
        >

            <StatusBar style="Light" />
            <KeyboardAvoidingView
                  behavior={Platform.OS==="ios" ? "padding" : "height"}
                  style={styles.container}
                  keyboardVerticalOffset={90}
            > 
            <TouchableWithoutFeedback onPress={keyboard.dismiss}>
              <>
              <ScrollView>
                  {messages.map(({id,data})=>(
                     data.email===auth.currentUser.email?(
                         <View key={id} style={styles.receiver}>
                             <Avatar/>
                             <Text style={styles.receiverText}>{data.message}</Text>
                         </View>
                     ):(
                         <View style={styles.sender}>
                             <Avatar/>
                             <Text style={styles.senderText}>{data.message}</Text>
                         </View>
                     )

                  ))}
                  {/* Chat Goes Here */}
              </ScrollView>
               <View style={styles.footer}>
                  <TextInput
                    value={input}
                    onChangeText={(text)=>setInput(text)}
                    onSubmitEditing={sendMessage}
                    placeholder="Connect Message"
                    style={styles.textInput}                  
                  />

                  <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                     <Ionicons name="send" size={24} color="#000"/>
                  </TouchableOpacity>

                  
               </View>
              </> 
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <Text>{route.params.chatName}</Text>
            {/* <Text>Chat Screen</Text> */}
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1,

     },
    receiver:{
        padding:15,
        backgroundColor:"#A0144F",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",    
    },

    sender:{
        padding:15,
        backgroundColor:"#B89B28",
        alignSelf:"flex-start",
        borderRadius:20,
        margin:15,
        maxWidth:"80%",
        position:"relative",    
    },

  

    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15,
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"transparent",
        backgroundColor:"#B339E5",
        borderWidth:1,
        padding:10,
        color:"gray",
        borderRadius:30
    }
})
