import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getAuth, signOut, updateEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

interface UserDetails {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

const Profile = () => {
    const [userDetails, setUserDetails] = useState<UserDetails>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState<UserDetails>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const fetchUserDetails = async () => {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const details = {
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        email: data.email || '',
                        phoneNumber: data.phoneNumber || '',
                    };
                    setUserDetails(details);
                    setEditedDetails(details);
                }
            };
            fetchUserDetails();
        }
    }, [user]);

    const handleSave = async () => {
        if (user) {
            try {
                // Update Firestore document
                await setDoc(doc(db, 'users', user.uid), editedDetails as UserDetails);

                // Update email in Firebase Auth if it has changed
                if (user.email !== editedDetails.email) {
                    await updateEmail(user, editedDetails.email);
                }

                setUserDetails(editedDetails);
                setIsEditing(false);
                Alert.alert('Success', 'User details saved successfully!');
            } catch (error) {
                console.error('Error saving user details:', error);
                Alert.alert('Error', 'Failed to save user details.');
            }
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.replace('/signin');
            Alert.alert('Success', 'Logged out successfully!');
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Error', 'Failed to log out.');
        }
    };

    const toggleEdit = () => {
        if (isEditing) {
            setEditedDetails(userDetails);
        }
        setIsEditing(!isEditing);
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://th.bing.com/th/id/OIP.yhqkR9B2hKbtwwZ8bPNbQQHaHw?w=191&h=200&c=7&o=5&dpr=1.3&pid=1.7' }}
                style={styles.profilePic}
            />
            <View style={styles.detailsContainer}>
                <TextInput
                    style={[styles.details, !isEditing && styles.readOnlyInput]}
                    placeholder="First Name"
                    value={isEditing ? editedDetails.firstName : userDetails.firstName}
                    onChangeText={(text) => setEditedDetails({ ...editedDetails, firstName: text })}
                    editable={isEditing}
                />
                <TextInput
                    style={[styles.details, !isEditing && styles.readOnlyInput]}
                    placeholder="Last Name"
                    value={isEditing ? editedDetails.lastName : userDetails.lastName}
                    onChangeText={(text) => setEditedDetails({ ...editedDetails, lastName: text })}
                    editable={isEditing}
                />
                <TextInput
                    style={[styles.details, !isEditing && styles.readOnlyInput]}
                    placeholder="Email"
                    value={isEditing ? editedDetails.email : userDetails.email}
                    onChangeText={(text) => setEditedDetails({ ...editedDetails, email: text })}
                    editable={isEditing}
                />
                <TextInput
                    style={[styles.details, !isEditing && styles.readOnlyInput]}
                    placeholder="Phone Number"
                    value={isEditing ? editedDetails.phoneNumber : userDetails.phoneNumber}
                    onChangeText={(text) => setEditedDetails({ ...editedDetails, phoneNumber: text })}
                    editable={isEditing}
                />
            </View>

            <TouchableOpacity onPress={toggleEdit}>
                <View style={[styles.card, { backgroundColor: isEditing ? 'orange' : 'green' }]}>
                    <MaterialIcons name={isEditing ? 'cancel' : 'edit'} size={24} color="white" />
                    <Text style={styles.cardtext}>{isEditing ? 'Cancel' : 'Edit'}</Text>
                </View>
            </TouchableOpacity>

            {isEditing && (
                <TouchableOpacity onPress={handleSave}>
                    <View style={[styles.card, { backgroundColor: 'blue' }]}>
                        <MaterialIcons name="save" size={24} color="white" />
                        <Text style={styles.cardtext}>Save</Text>
                    </View>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleLogout}>
                <View style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    profilePic: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: 'center',
        marginBottom: 20,
    },
    detailsContainer: {
        marginBottom: 20,
    },
    details: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 10,
        borderRadius: 5,
    },
    readOnlyInput: {
        backgroundColor: '#f0f0f0',
        color: '#333',
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
    },
    cardtext: {
        color: 'white',
        marginLeft: 10,
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Profile;