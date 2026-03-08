import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BottomNavigation from '../components/bottom-navigation';

export default function CreditsScreen() {
  const [credits, setCredits] = useState(150); // Placeholder credit balance

  const creditPackages = [
    { amount: 50, price: '$4.99' },
    { amount: 100, price: '$8.99' },
    { amount: 250, price: '$19.99' },
    { amount: 500, price: '$34.99' },
  ];

  const handleRechargeCredits = (packageAmount: number) => {
    // TODO: Implement payment system
    console.log(`Recharging ${packageAmount} credits`);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Credits</Text>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Current Balance */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceAmount}>{credits}</Text>
            <Text style={styles.creditsLabel}>Credits</Text>
          </View>

          {/* How Credits Work */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>How Credits Work</Text>
            <Text style={styles.bulletPoint}>• Use credits to enroll in classes</Text>
            <Text style={styles.bulletPoint}>• Different classes require different amounts</Text>
            <Text style={styles.bulletPoint}>• Credits never expire</Text>
            <Text style={styles.bulletPoint}>• Get bonus credits on purchases</Text>
          </View>

          {/* Recharge Options */}
          <View style={styles.rechargeSection}>
            <Text style={styles.sectionTitle}>Recharge Credits</Text>
            
            {creditPackages.map((pkg, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.packageCard}
                onPress={() => handleRechargeCredits(pkg.amount)}
              >
                <View>
                  <Text style={styles.packageAmount}>{pkg.amount} Credits</Text>
                  <Text style={styles.packagePrice}>{pkg.price}</Text>
                </View>
                <Text style={styles.buyButton}>Buy</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Transaction History Header */}
          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>Transaction History</Text>
            
            <View style={styles.transactionCard}>
              <View>
                <Text style={styles.transactionTitle}>Class Enrollment</Text>
                <Text style={styles.transactionDate}>March 5, 2026</Text>
              </View>
              <Text style={styles.transactionAmount}>-50</Text>
            </View>

            <View style={styles.transactionCard}>
              <View>
                <Text style={styles.transactionTitle}>Credits Purchase</Text>
                <Text style={styles.transactionDate}>March 1, 2026</Text>
              </View>
              <Text style={styles.transactionAmountPositive}>+200</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 70,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  balanceCard: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  creditsLabel: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  rechargeSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  packageCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packageAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  packagePrice: {
    fontSize: 14,
    color: '#666',
  },
  buyButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    fontWeight: 'bold',
    fontSize: 14,
    overflow: 'hidden',
  },
  historySection: {
    marginBottom: 20,
  },
  transactionCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  transactionAmountPositive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
});
