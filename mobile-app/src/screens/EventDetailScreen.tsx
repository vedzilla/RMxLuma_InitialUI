import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Image } from 'expo-image';
import { formatDateTime, formatTime } from '../utils/dateUtils';

type EventDetailScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;
type EventDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventDetail'>;

export default function EventDetailScreen() {
  const route = useRoute<EventDetailScreenRouteProp>();
  const navigation = useNavigation<EventDetailScreenNavigationProp>();
  const { event } = route.params;

  const handleRegister = () => {
    Linking.openURL(event.externalUrl);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* Event Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: event.imageUrl }}
            style={styles.image}
            contentFit="cover"
          />
        </View>

        {/* Event Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{event.title}</Text>
          
          {/* Meta Info */}
          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>{formatDateTime(event.startDateTime)}</Text>
            {event.interestedCount > 50 && (
              <View style={styles.trendingBadge}>
                <Text style={styles.trendingText}>Trending</Text>
              </View>
            )}
          </View>

          {/* Key Info */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{event.locationName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>City</Text>
              <Text style={styles.infoValue}>{event.city}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>University</Text>
              <Text style={styles.infoValue}>{event.university}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Host</Text>
              <Text style={styles.infoValue}>{event.societyName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Price</Text>
              <Text style={styles.infoValue}>{event.priceLabel}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionTitle}>About this event</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {event.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Social Proof */}
          <View style={styles.socialProof}>
            <Text style={styles.socialProofText}>
              {event.interestedCount} interested • {event.savedCount} saved
            </Text>
          </View>

          {/* CTA Buttons */}
          <View style={styles.ctaContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
              <Text style={styles.primaryButtonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Get reminders in the app</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#E5E7EB',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.02,
    lineHeight: 34,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  metaText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  trendingBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  trendingText: {
    fontSize: 10,
    color: '#EF4444',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 12,
    letterSpacing: -0.01,
  },
  description: {
    fontSize: 16,
    color: '#0F172A',
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 13,
    color: '#6366F1',
    fontWeight: '500',
  },
  socialProof: {
    marginBottom: 24,
  },
  socialProofText: {
    fontSize: 14,
    color: '#64748B',
  },
  ctaContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#0F172A',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
  },
});




