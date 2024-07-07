import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://th.bing.com/th/id/OIP.yhqkR9B2hKbtwwZ8bPNbQQHaHw?w=191&h=200&c=7&o=5&dpr=1.3&pid=1.7' }}
          style={styles.profilePic}
        />
        <Text style={styles.headerText}>K-Scholar</Text>
        <TouchableOpacity onPress={() => router.push('/search')}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Applications</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Find Scholarships</Text>
            <Ionicons name="information-circle-outline" size={24} color="black" />
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '30%' }]} />
          </View>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>VIEW CALENDAR</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Scholarship Details</Text>
            <Ionicons name="information-circle-outline" size={24} color="black" />
          </View>
          <Text style={styles.cardSubtitle}>Learn more about this scholarship</Text>
          <Text style={styles.deadline}>Tomorrow, 9:30 AM</Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Update Profile Information</Text>
            <Ionicons name="information-circle-outline" size={24} color="black" />
          </View>
          <Text style={styles.cardSubtitle}>Keep your profile up to date</Text>
          <Text style={styles.deadline}>Tomorrow, 9:45 AM</Text>
        </View>
        
        <Text style={styles.sectionTitle}>My Profile Categories</Text>
        <View style={styles.categoriesContainer}>
          <View style={styles.category}>
            <Ionicons name="school" size={24} color="black" />
            <Text style={styles.categoryText}>Merit-Based</Text>
          </View>
          <View style={styles.category}>
            <Ionicons name="people" size={24} color="black" />
            <Text style={styles.categoryText}>Need-Based</Text>
          </View>
          <View style={styles.category}>
            <Ionicons name="cash" size={24} color="black" />
            <Text style={styles.categoryText}>Financial Aid</Text>
          </View>
          <View style={styles.category}>
            <Ionicons name="heart" size={24} color="black" />
            <Text style={styles.categoryText}>Student Support Services</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: -10
  },
  content: {
    padding: 15,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAll: {
    color: 'blue',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: 'gray',
    marginTop: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginVertical: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: 'green',
    borderRadius: 5,
  },
  applyButton: {
    backgroundColor: 'limegreen',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deadline: {
    marginTop: 5,
    color: 'gray',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryText: {
    marginLeft: 10,
  },
});

export default HomeScreen;