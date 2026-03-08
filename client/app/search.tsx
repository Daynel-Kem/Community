import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { sampleClasses } from '../data/sampleClasses';
import BottomNavigation from '../components/bottom-navigation';

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClasses, setFilteredClasses] = useState(sampleClasses);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [capacityMin, setCapacityMin] = useState('');
  const [capacityMax, setCapacityMax] = useState('');

  const allTags = [...new Set(sampleClasses.flatMap(cls => cls.tags))];

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setPriceMin('');
    setPriceMax('');
    setDateStart('');
    setDateEnd('');
    setCapacityMin('');
    setCapacityMax('');
  };

  useEffect(() => {
    let filtered = sampleClasses;

    // Filter by search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(classItem =>
        classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        classItem.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(classItem =>
        selectedTags.some(tag => classItem.tags.includes(tag))
      );
    }

    // Filter by price range
    if (priceMin !== '') {
      const min = parseFloat(priceMin);
      filtered = filtered.filter(classItem => classItem.price >= min);
    }
    if (priceMax !== '') {
      const max = parseFloat(priceMax);
      filtered = filtered.filter(classItem => classItem.price <= max);
    }

    // Filter by date range
    if (dateStart !== '') {
      filtered = filtered.filter(classItem => classItem.date >= dateStart);
    }
    if (dateEnd !== '') {
      filtered = filtered.filter(classItem => classItem.date <= dateEnd);
    }

    // Filter by capacity range
    if (capacityMin !== '') {
      const min = parseInt(capacityMin);
      filtered = filtered.filter(classItem => classItem.capacity >= min);
    }
    if (capacityMax !== '') {
      const max = parseInt(capacityMax);
      filtered = filtered.filter(classItem => classItem.capacity <= max);
    }

    setFilteredClasses(filtered);
  }, [searchQuery, selectedTags, priceMin, priceMax, dateStart, dateEnd, capacityMin, capacityMax]);

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Find Classes</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search classes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={styles.filterToggle}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Text style={styles.filterToggleText}>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filters */}
        {showFilters && (
          <View style={styles.filtersContainer}>
            <Text style={styles.filtersTitle}>Filters</Text>

            {/* Tag Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Tags:</Text>
              <View style={styles.typeButtons}>
                {allTags.map(tag => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.typeButton,
                      selectedTags.includes(tag) && styles.typeButtonSelected
                    ]}
                    onPress={() => toggleTag(tag)}
                  >
                    <Text style={[
                      styles.typeButtonText,
                      selectedTags.includes(tag) && styles.typeButtonTextSelected
                    ]}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Price Range ($):</Text>
              <View style={styles.rangeContainer}>
                <TextInput
                  style={styles.rangeInput}
                  placeholder="Min"
                  value={priceMin}
                  onChangeText={setPriceMin}
                  keyboardType="numeric"
                />
                <Text style={styles.rangeSeparator}>-</Text>
                <TextInput
                  style={styles.rangeInput}
                  placeholder="Max"
                  value={priceMax}
                  onChangeText={setPriceMax}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Date Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Date Range (YYYY-MM-DD):</Text>
              <View style={styles.rangeContainer}>
                <TextInput
                  style={styles.rangeInput}
                  placeholder="Start"
                  value={dateStart}
                  onChangeText={setDateStart}
                />
                <Text style={styles.rangeSeparator}>-</Text>
                <TextInput
                  style={styles.rangeInput}
                  placeholder="End"
                  value={dateEnd}
                  onChangeText={setDateEnd}
                />
              </View>
            </View>

            {/* Capacity Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Capacity Range:</Text>
              <View style={styles.rangeContainer}>
                <TextInput
                  style={styles.rangeInput}
                  placeholder="Min"
                  value={capacityMin}
                  onChangeText={setCapacityMin}
                  keyboardType="numeric"
                />
                <Text style={styles.rangeSeparator}>-</Text>
                <TextInput
                  style={styles.rangeInput}
                  placeholder="Max"
                  value={capacityMax}
                  onChangeText={setCapacityMax}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear All Filters</Text>
            </TouchableOpacity>
          </View>
        )}

      {/* Classes List */}
      <View style={styles.classesContainer}>
        <Text style={styles.sectionTitle}>Available Classes</Text>

        {filteredClasses.map((classItem) => (
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterToggle: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  filterToggleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  filterSection: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  typeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  typeButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#666',
  },
  typeButtonTextSelected: {
    color: '#fff',
  },
  rangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rangeInput: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
  },
  rangeSeparator: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#666',
  },
  clearFiltersButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  clearFiltersText: {
    color: '#fff',
    fontSize: 16,
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
