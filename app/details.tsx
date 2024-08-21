import React, { useState, ReactNode } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ExpandableItemProps {
  title: string;
  children: ReactNode;
}

const ExpandableItem: React.FC<ExpandableItemProps> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.expandableItem}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.expandableHeader}>
        <Text style={styles.expandableTitle}>{title}</Text>
        <Icon name={expanded ? 'expand-less' : 'expand-more'} size={24} color="#fff" />
      </TouchableOpacity>
      {expanded && <View style={styles.expandableContent}>{children}</View>}
    </View>
  );
};

const ScholarshipDetails: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Scholarship Details</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scholarship Details</Text>
          <Text style={styles.itemContent}>
The [Scholarship Name] is designed to support outstanding students who demonstrate academic excellence, leadership potential, and a commitment to community service. This scholarship provides financial assistance to help cover tuition, books, and other educational expenses, enabling recipients to focus on their studies and personal development. Open to [specific group, e.g., undergraduate or graduate students] in [specific field of study or any field], the scholarship aims to foster future leaders who will contribute positively to society. Applicants must meet the eligibility criteria and submit all required documents by the specified deadline.</Text>
          
          <ExpandableItem title="Essay Submission">
            <Text style={styles.input}>Submit your essay here</Text>
          </ExpandableItem>
          <View>
          <ExpandableItem title="Passport Picture Submission">
                        
            <Text style={styles.input}>Attach passport picture here <Ionicons name="attach" size={23} color="black" /></Text>
          </ExpandableItem>
          </View>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Application status</Text>
          <ExpandableItem title="Payment method selection">
            <Text style={styles.itemContent}>Select your payment method</Text>
            <Text style={styles.itemContent}>1. Mobile Money</Text>
            <Text style={styles.itemContent}>2. Card</Text>
          </ExpandableItem>
          <ExpandableItem title="Donate to Scholarship fund">
            <Text style={styles.itemContent}>Optional: Make a donation</Text>
          </ExpandableItem>
        </View>
      </ScrollView>

      <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected scholarship</Text>
          <View style={styles.scholarshipItem}>
            <Text style={styles.scholarshipName}>Description</Text>
            <Text style={styles.scholarshipAmount}>GHC 200.00</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: '100%' }]} />
            </View>
          </View>
        </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.viewCartButton}>
          <Text style={styles.buttonText}>Go to Website</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 16,

  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  expandableItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  expandableTitle: {
    fontSize: 16,
    color: '#fff',
  },
  expandableContent: {
    padding: 16,
  },
  itemContent: {
    color: '#ccc',
    marginLeft: 15,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: -20,
    textAlign: 'center',
    height: 50,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  upgradePlan: {
    backgroundColor: '#444',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 10,
  },
  upgradePlanText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scholarshipItem: {
    backgroundColor: '#444',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
  },
  scholarshipName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  scholarshipAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#666',
    borderRadius: 4,
    marginVertical: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  appliedLabel: {
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  appliedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  viewCartButton: {
    backgroundColor: '#666',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  payButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    paddingVertical: 12,
  },
});

export default ScholarshipDetails;