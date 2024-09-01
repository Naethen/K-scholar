import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking, Image } from 'react-native';

const ScholarshipDetails = () => {
  const handleApplyNow = () => {
    const url = 'https://mcf.knust.edu.gh/scholarship-application/';
    Linking.openURL(url).catch((err) => {
      Alert.alert('Error', 'Failed to open the application page. Please try again later.');
      console.error("Failed to open URL:", err);
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Scholarship Overview */}
      <Text style={styles.title}>MasterCard Foundation Scholarship - KNUST</Text>
      <View>
      <Image
          source={{ uri: 'https://th.bing.com/th/id/OIP.29rlj59jt1_2SfceyMjLRQAAAA?w=252&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' }}
          style={styles.scholarshipImage}
        />
      </View>
      <Text style={styles.sectionTitle}>Scholarship Overview</Text>
      <Text style={styles.text}>
        The MasterCard Foundation Scholarship at KNUST provides full tuition coverage for brilliant but needy students.
        The scholarship is aimed at students who demonstrate academic excellence and leadership potential.
      </Text>

      {/* Eligibility Criteria */}
      <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
      <View style={styles.listItem}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.text}>Must be a citizen of an African country.</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.text}>Must have a proven record of academic excellence with a minimum GPA of 3.0.</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.text}>Must demonstrate leadership potential and commitment to giving back to the community.</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.text}>Must be from a financially disadvantaged background.</Text>
      </View>

      {/* Application Requirements */}
      <Text style={styles.sectionTitle}>Application Requirements</Text>
      <View style={styles.listItem}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.text}>Completed application form.</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.text}>Personal essay (500 words) outlining your academic achievements, leadership experience, and future goals.</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.text}>Two letters of recommendation from academic or community leaders.</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.text}>Proof of financial need (e.g., family income statement).</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.text}>Copy of your academic transcripts.</Text>
      </View>

      {/* Deadlines */}
      <Text style={styles.sectionTitle}>Deadlines</Text>
      <Text style={styles.text}>Application Deadline: September 30, 2024</Text>
      <Text style={styles.text}>Notification Date: November 15, 2024</Text>

      {/* Benefits */}
      <Text style={styles.sectionTitle}>Scholarship Benefits</Text>
      <Text style={styles.text}>• Full tuition coverage.</Text>
      <Text style={styles.text}>• Accommodation and living expenses.</Text>
      <Text style={styles.text}>• Leadership training and mentorship opportunities.</Text>

      {/* Contact Information */}
      <Text style={styles.sectionTitle}>Contact Information</Text>
      <Text style={styles.text}>For more information, contact:</Text>
      <Text style={styles.text}>Email: mastercard@knust.edu.gh</Text>
      <Text style={styles.text}>Phone: +233 20 000 0000</Text>

      {/* Apply Now Button */}
      <TouchableOpacity style={styles.applyButton} onPress={handleApplyNow}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2e0',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  scholarshipImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 20,
    color: '#666',
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: '#02B200',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  applyButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ScholarshipDetails;