import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ExploreScreen = () => {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search Scholarships"
          placeholderTextColor="#999"
        />
      </View>

      <Text style={styles.sectionTitle}>Featured Scholarships</Text>

    <ScrollView horizontal>
      <View style={styles.scholarshipCard}>
        <Image
          source={{ uri: 'https://th.bing.com/th/id/OIP.ci7pmd1QrImBYAbgXKg9QAAAAA?rs=1&pid=ImgDetMain' }}
          style={styles.scholarshipImage}
        />
        <Text style={styles.scholarshipTitle}>Hulede Foundation Scholarship-KNUST</Text>
        <Text style={styles.scholarshipDescription}>Full tuition for top-performing students.</Text>
        <TouchableOpacity style={styles.applyButton} onPress={() => router.push('/details')}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scholarshipCard}>
        <Image
          source={{ uri: 'https://th.bing.com/th/id/OIP.29rlj59jt1_2SfceyMjLRQAAAA?w=252&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' }}
          style={styles.scholarshipImage}
        />
        <Text style={styles.scholarshipTitle}>MasterCard Scholarship Foundation-KNUST</Text>
        <Text style={styles.scholarshipDescription}>Full tuition for brilliant but needy students.</Text>
        <TouchableOpacity style={styles.applyButton} onPress={() => router.push('/details')}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scholarshipCard}>
        <Image 
          source={{uri: 'https://th.bing.com/th/id/OIP.Hs8UHK1fSTCQTR88qyMB_wHaD4?rs=1&pid=ImgDetMain'}} 
          style={styles.scholarshipImage}/>
        <Text style={styles.scholarshipItemTitle}>GNPC Foundation Local Scholarhsip</Text>
        <Text style={styles.scholarshipDescription}>For undergraduates and postgraduates pursuing{'\n'}degrees in Ghana</Text>
        <TouchableOpacity style={styles.applyButton} onPress={() => router.push('/details')}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

      <Text style={styles.sectionTitle}>All Scholarships</Text>

      <View style={styles.scholarshipItem}>
        <Text style={styles.scholarshipItemTitle}>Edu Fondazione Scholarship</Text>
        <Text style={styles.scholarshipItemDescription}>For students of needy background.</Text>
        <TouchableOpacity style={styles.applyButton} onPress={() => router.push('/details')}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scholarshipItem}>
        <Text style={styles.scholarshipItemTitle}>Renewal - Hulede Foundation KNUST Scholarship</Text>
        <Text style={styles.scholarshipItemDescription}>For students excelling in sciences and engineering.</Text>
        <TouchableOpacity style={styles.applyButton} onPress={() => router.push('/details')}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scholarshipItem}>
        <Text style={styles.scholarshipItemTitle}>Educational Pathways International Scholarships</Text>
        <Text style={styles.scholarshipItemDescription}>For students from poor living conditions</Text>
        <TouchableOpacity style={styles.applyButton} onPress={() => router.push('/details')}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    color: '#333',
  },
  scholarshipCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginEnd: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  scholarshipImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  scholarshipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  scholarshipDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  applyButton: {
    backgroundColor: '#02B200',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 15
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scholarshipItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  scholarshipItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  scholarshipItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
});

export default ExploreScreen;