import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Event } from '../data/mockEvents';
import { formatDateTime } from '../utils/dateUtils';

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

export default function EventCard({ event, onPress }: EventCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Cover Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.imageUrl }}
          style={styles.image}
          contentFit="cover"
        />
      </View>

      {/* Card Body */}
      <View style={styles.body}>
        {/* Meta Info */}
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>{formatDateTime(event.startDateTime)}</Text>
          {event.interestedCount > 50 && (
            <View style={styles.trendingBadge}>
              <Text style={styles.trendingText}>Trending</Text>
            </View>
          )}
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>

        {/* Host */}
        <Text style={styles.host} numberOfLines={1}>
          {event.societyName} • {event.locationName}
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {event.priceLabel} • {event.interestedCount} going
          </Text>
          <View style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#E5E7EB',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    padding: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  trendingBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  trendingText: {
    fontSize: 10,
    color: '#EF4444',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.02,
    lineHeight: 24,
    marginBottom: 6,
  },
  host: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  registerButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'transparent',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  registerButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#0F172A',
  },
});




