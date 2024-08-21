import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Profile = () => {
    return (
        <View>
        <Image
          source={{ uri: 'https://th.bing.com/th/id/OIP.yhqkR9B2hKbtwwZ8bPNbQQHaHw?w=191&h=200&c=7&o=5&dpr=1.3&pid=1.7' }}
          style={styles.profilePic}
        />
            <View>
                <Text style={styles.details} >First Name</Text>
                <Text style={styles.details} >Last Name</Text>
                <Text style={styles.details} >Email</Text>
                <Text style={styles.details} >Phone Number</Text>
            </View>
            
            <TouchableOpacity>
              <View style={styles.card}>
                <MaterialIcons name="edit" size={24} color="white" />
                <Text style={styles.cardtext}> Edit </Text>
              </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    profilePic: {
        width: 200,
        height: 200,
        borderRadius: 20,
        marginLeft: 115,
      },
    details: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginLeft: 15,
        marginRight: 15,
        marginVertical: 10,
        marginBottom: 20,
        borderRadius: 5,
      },
      card: {
        backgroundColor: 'blue',
        width: "30%",
        flexDirection: 'row',
        marginStart: "67%",
        marginTop: "30%",
        borderRadius: 20,
        padding: 20,
        alignItems: 'center'
      },
      cardtext: {
        color: "white",
      },
});

export default Profile;