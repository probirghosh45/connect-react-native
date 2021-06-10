import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem , Avatar } from 'react-native-elements';


const CustomListItem = ({id,chatName,enterChat}) => {
    return (
        <ListItem onPress={()=> enterChat(id,chatName)} key={id} bottomDivider>
            
            <Avatar
            rounded
            source={{
                uri: 
                // chatMessages?.[0].photoURL ||
                "https://i.ibb.co/gWJS7dm/download.png"
            }} 
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"800"}}>
                    {chatName}
                </ListItem.Title>

                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >
                   
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                   Eum veniam, possimus dignissimos dolorum animi quis totam 
                   impedit eligendi. Commodi, corrupti.

                </ListItem.Subtitle>
            </ListItem.Content>
            
            {/* <Text></Text> */}
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
