import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { sampleClasses } from '../data/sampleClasses';

const { width } = Dimensions.get('window');

export default function LandingPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/login');
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Classes</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Classes List */}
      <View style={styles.classesContainer}>
        <Text style={styles.sectionTitle}>Available Classes</Text>

        {sampleClasses.map((classItem) => (
          <View key={classItem.id} style={styles.classCard}>
            <View style={styles.classHeader}>
              <Text style={styles.classTitle}>{classItem.title}</Text>
              <Text style={styles.classPrice}>{formatPrice(classItem.price)}</Text>
            </View>

            <Text style={styles.classDescription}>{classItem.description}</Text>

            <View style={styles.classDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>� Date:</Text>
                <Text style={styles.detailValue}>{classItem.date}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>⏰ Time:</Text>
                <Text style={styles.detailValue}>{classItem.time}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>�👥 Capacity:</Text>
                <Text style={styles.detailValue}>{classItem.capacity} students</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>📍 Location:</Text>
                <Text style={styles.detailValue}>{classItem.location}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>👨‍🏫 Host:</Text>
                <Text style={styles.detailValue}>{classItem.host}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.enrollButton} onPress={() => router.push(`/class-details?id=${classItem.id}`)}>
              <Text style={styles.enrollButtonText}>Enroll Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Community Classes. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  classesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  classCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  classTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  classPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  classDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  classDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  enrollButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
});