import { Link } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const services = [
  {
    icon: '🩺',
    title: 'Find a Doctor',
    description: 'Connect with veterinary experts.',
  },
  {
    icon: '🐄',
    title: 'Animal Care',
    description: 'Take better care of your animals.',
  },
  {
    icon: '💊',
    title: 'Medicines',
    description: 'Get the right medicine for your pets.',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAF5" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🐄</Text>
            <Text style={styles.logoText}>Gobadi</Text>
          </View>

          <Link href="/login" asChild>
            <Pressable style={styles.headerButton}>
              <Text style={styles.headerButtonText}>Login</Text>
            </Pressable>
          </Link>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              ✦ SMART ANIMAL HEALTHCARE
            </Text>
          </View>

          <Text style={styles.heading}>
            Better Care for Your{' '}
            <Text style={styles.highlight}>Animals.</Text>
          </Text>

          <Text style={styles.subtitle}>
            Connect with trusted veterinary doctors, get expert
            advice, and keep your animals healthy and happy.
          </Text>

          <Link href="/(tabs)" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>
                Explore Gobadi →
              </Text>
            </Pressable>
          </Link>

          <View style={styles.heroImage}>
            <Text style={styles.animalEmoji}>🐄 🐐 🐓</Text>
            <View style={styles.imageCaption}>
              <Text style={styles.imageCaptionTitle}>
                Healthy Animals, Happy Farmers
              </Text>
              <Text style={styles.imageCaptionSubtitle}>
                Your trusted animal care companion
              </Text>
            </View>
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <Text style={styles.sectionSubtitle}>
            Everything your animals need, in one place.
          </Text>

          {services.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceEmoji}>
                  {service.icon}
                </Text>
              </View>

              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>
                  {service.title}
                </Text>
                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </View>
          ))}
        </View>

        {/* Bottom CTA */}
        <View style={styles.bottomCard}>
          <Text style={styles.bottomTitle}>
            Your Animals Deserve the Best!
          </Text>

          <Text style={styles.bottomDescription}>
            Start exploring smarter animal healthcare today.
          </Text>

          <Link href="/(tabs)" asChild>
            <Pressable style={styles.bottomButton}>
              <Text style={styles.bottomButtonText}>
                Get Started →
              </Text>
            </Pressable>
          </Link>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Made with care for farmers ❤️
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FAF5',
  },
  container: {
    paddingHorizontal: 22,
    paddingBottom: 35,
  },
  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    fontSize: 27,
  },
  logoText: {
    fontSize: 23,
    fontWeight: '800',
    color: '#183D2A',
  },
  headerButton: {
    backgroundColor: '#E5F2E7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  headerButtonText: {
    color: '#237443',
    fontWeight: '700',
    fontSize: 14,
  },
  hero: {
    paddingTop: 30,
  },
  badge: {
    backgroundColor: '#E6F3E8',
    alignSelf: 'flex-start',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: '#287447',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heading: {
    fontSize: 39,
    lineHeight: 47,
    fontWeight: '900',
    color: '#193B2A',
    marginTop: 22,
  },
  highlight: {
    color: '#38A169',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 25,
    color: '#748078',
    marginTop: 13,
    marginBottom: 23,
  },
  primaryButton: {
    backgroundColor: '#25834D',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  heroImage: {
    backgroundColor: '#DDEEDD',
    height: 205,
    borderRadius: 25,
    marginTop: 27,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  animalEmoji: {
    fontSize: 65,
    marginBottom: 13,
  },
  imageCaption: {
    alignItems: 'center',
  },
  imageCaptionTitle: {
    color: '#204A30',
    fontSize: 16,
    fontWeight: '800',
  },
  imageCaptionSubtitle: {
    color: '#54755C',
    fontSize: 12,
    marginTop: 5,
  },
  section: {
    marginTop: 38,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#193B2A',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#849087',
    marginTop: 7,
    marginBottom: 18,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EDF1EB',
  },
  serviceIcon: {
    height: 52,
    width: 52,
    borderRadius: 15,
    backgroundColor: '#EFF7EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceEmoji: {
    fontSize: 26,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 14,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#244330',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#8A968D',
    marginTop: 5,
  },
  arrow: {
    fontSize: 27,
    color: '#80A58A',
  },
  bottomCard: {
    backgroundColor: '#194D32',
    padding: 25,
    borderRadius: 23,
    marginTop: 25,
  },
  bottomTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bottomDescription: {
    color: '#D1E5D5',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 9,
  },
  bottomButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 20,
  },
  bottomButtonText: {
    color: '#205B38',
    fontWeight: '800',
    fontSize: 14,
  },
  footer: {
    textAlign: 'center',
    color: '#96A197',
    fontSize: 12,
    marginTop: 25,
  },
});