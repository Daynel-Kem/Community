import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { sampleClasses } from '../data/sampleClasses';

const { width } = Dimensions.get('window');

export default function ClassDetailsPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Find the class by ID
  const classItem = sampleClasses.find(cls => cls.id === parseInt(id));

  if (!classItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Class not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Class Details</Text>
        <View style={{ width: 60 }} /> {/* Spacer for centering */}
      </View>

      {/* Class Title and Price */}
      <View style={styles.titleSection}>
        <Text style={styles.classTitle}>{classItem.title}</Text>
        <Text style={styles.classPrice}>{formatPrice(classItem.price)}</Text>
      </View>

      {/* Class Description */}
      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>About This Class</Text>
        <Text style={styles.description}>{classItem.description}</Text>
      </View>

      {/* Class Details */}
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Class Information</Text>

        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📅</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{formatDate(classItem.date)}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>⏰</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{classItem.time}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>👥</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Capacity</Text>
              <Text style={styles.detailValue}>{classItem.capacity} students</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📍</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{classItem.location}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>👨‍🏫</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Instructor</Text>
              <Text style={styles.detailValue}>{classItem.host}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* What You'll Learn */}
      <View style={styles.learningSection}>
        <Text style={styles.sectionTitle}>What You'll Learn</Text>
        <View style={styles.learningCard}>
          <Text style={styles.learningText}>
            • Hands-on experience with practical projects{'\n'}
            • Industry best practices and techniques{'\n'}
            • Networking opportunities with fellow students{'\n'}
            • Certificate of completion{'\n'}
            • Access to course materials and resources
          </Text>
        </View>
      </View>

      {/* Requirements */}
      <View style={styles.requirementsSection}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        <View style={styles.requirementsCard}>
          <Text style={styles.requirementsText}>
            • Basic computer skills{'\n'}
            • Laptop or device for hands-on exercises{'\n'}
            • Enthusiasm to learn and participate{'\n'}
            • No prior experience required for beginner classes
          </Text>
        </View>
      </View>

      {/* Enroll Button */}
      <View style={styles.enrollSection}>
        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollButtonText}>Enroll Now - {formatPrice(classItem.price)}</Text>
        </TouchableOpacity>
        <Text style={styles.spotsLeft}>{classItem.capacity} spots available</Text>
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
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  titleSection: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  classTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  classPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  descriptionSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detailsSection: {
    padding: 20,
  },
  detailCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIcon: {
    fontSize: 24,
    width: 40,
    textAlign: 'center',
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  learningSection: {
    padding: 20,
  },
  learningCard: {
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: 20,
  },
  learningText: {
    fontSize: 16,
    color: '#2e7d32',
    lineHeight: 24,
  },
  requirementsSection: {
    padding: 20,
  },
  requirementsCard: {
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    padding: 20,
  },
  requirementsText: {
    fontSize: 16,
    color: '#f57c00',
    lineHeight: 24,
  },
  enrollSection: {
    padding: 20,
    alignItems: 'center',
  },
  enrollButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spotsLeft: {
    fontSize: 14,
    color: '#666',
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
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 100,
  },
});