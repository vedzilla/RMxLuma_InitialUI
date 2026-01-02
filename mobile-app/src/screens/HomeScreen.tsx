import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import { mockEvents } from '../data/mockEvents';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useState, useMemo } from 'react';
import { filterEvents, sortEvents, SortOption } from '../utils/eventUtils';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('soonest');

  const filteredEvents = useMemo(() => {
    let events = filterEvents(mockEvents, searchQuery);
    events = sortEvents(events, sortBy);
    return events;
  }, [searchQuery, sortBy]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Find society events{'\n'}across the UK</Text>
          <Text style={styles.heroSubtitle}>Discover events from university societies near you</Text>
        </View>

        {/* Events List */}
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Events</Text>
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => navigation.navigate('EventDetail', { event })}
            />
          ))}
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
  hero: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.02,
    lineHeight: 38,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 22,
  },
  eventsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
    letterSpacing: -0.01,
  },
});




