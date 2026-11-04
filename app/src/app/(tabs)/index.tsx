
import { globalStyles } from '@/styles/global';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView
      style={globalStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Header */}
        <Text style={globalStyles.title}>Gobaadi</Text>
        <Text style={styles.subtitle}>
          Welcome to your meal dashboard
        </Text>

        {/* Summary Cards */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>12</Text>
            <Text style={styles.cardLabel}>Total Meals</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardNumber}>5</Text>
            <Text style={styles.cardLabel}>Today's Meals</Text>
          </View>
        </View>

        {/* Recent Meals */}
        <Text style={styles.sectionTitle}>Recent Meals</Text>

        <View style={styles.mealCard}>
          <Text style={styles.mealName}>Breakfast</Text>
          <Text style={styles.mealDescription}>
            Rice, Egg and Vegetables
          </Text>
          <Text style={styles.mealTime}>8:00 AM</Text>
        </View>

        <View style={styles.mealCard}>
          <Text style={styles.mealName}>Lunch</Text>
          <Text style={styles.mealDescription}>
            Rice, Fish and Salad
          </Text>
          <Text style={styles.mealTime}>1:00 PM</Text>
        </View>

        <View style={styles.mealCard}>
          <Text style={styles.mealName}>Dinner</Text>
          <Text style={styles.mealDescription}>
            Rice, Chicken and Vegetables
          </Text>
          <Text style={styles.mealTime}>8:00 PM</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
    marginBottom: 24,
  },

  cardContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E1DC',
  },

  cardNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#BD632F',
  },

  cardLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1817',
    marginBottom: 16,
  },

  mealCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6E1DC',
  },

  mealName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1817',
  },

  mealDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 6,
  },

  mealTime: {
    fontSize: 12,
    color: '#BD632F',
    marginTop: 10,
  },
});
