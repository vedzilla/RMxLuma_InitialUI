import { getClient } from './client';
import { transformEvent, generateSlug } from './transform';
import { getCities } from './cities';
import type { Event, EventWithRelations } from './types';

// Supabase select string that joins all needed relations.
const EVENT_SELECT = `
  *,
  categories(id, name),
  event_societies(
    societies(
      id, name, instagram_handle, description, bio_url, image_url, university_id, created_at, updated_at,
      universities(id, name, short_name, city_id, created_at, cities(id, name))
    )
  ),
  event_images(post_id, image_index, post_images(s3_url)),
  schedule_entries(id, scheduled_at, is_end_schedule, schedule_order, location_id, locations(id, name, google_maps_url))
`.trim();

export interface GetEventsOptions {
  /** Filter by category name (e.g. 'Social', 'Sports'). Case-insensitive. */
  category?: string;
  /** Filter by city derived from location string (e.g. 'Manchester'). */
  city?: string;
  /** Filter by university name (matched on joined societies.universities). */
  university?: string;
  /** Only return upcoming events (event_date >= now). Defaults to true. */
  upcomingOnly?: boolean;
  /** Max number of results to return. */
  limit?: number;
}

/**
 * Fetch all events, optionally filtered.
 * Returns events ordered by event_date ascending.
 */
export async function getEvents(options: GetEventsOptions = {}): Promise<Event[]> {
  const { upcomingOnly = true, limit } = options;

  const { data, error } = await getClient()
    .from('events')
    .select(EVENT_SELECT);

  if (error) {
    console.error('[supabase_lib] getEvents error:', error.message);
    return [];
  }

  let events = (data as unknown as EventWithRelations[]).map(transformEvent);

  // Sort by first schedule entry ascending.
  events.sort((a, b) => a.startDateTime.localeCompare(b.startDateTime));

  // Apply upcoming filter client-side (event_date no longer on events table).
  if (upcomingOnly) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    events = events.filter(e => e.startDateTime >= today.toISOString());
  }

  if (limit) events = events.slice(0, limit);

  // Client-side filtering for fields not easily filtered in SQL.
  return events.filter(event => {
    if (options.category && !event.tags.some(t => t.toLowerCase() === options.category!.toLowerCase())) {
      return false;
    }
    if (options.city && event.city.toLowerCase() !== options.city.toLowerCase()) {
      return false;
    }
    if (options.university && event.university.toLowerCase() !== options.university.toLowerCase()) {
      return false;
    }
    return true;
  });
}

/**
 * Fetch a single event by its UUID.
 */
export async function getEventById(id: string): Promise<Event | null> {
  const { data, error } = await getClient()
    .from('events')
    .select(EVENT_SELECT)
    .eq('id', id)
    .single();

  if (error || !data) {
    if (error?.code !== 'PGRST116') {
      console.error('[supabase_lib] getEventById error:', error?.message);
    }
    return null;
  }

  return transformEvent(data as unknown as EventWithRelations);
}

/**
 * Fetch a single event by its slug (derived from title).
 * Note: slugs are generated client-side, so this fetches all events
 * and finds the match — use getEventById when you have the UUID.
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const events = await getEvents({ upcomingOnly: false });
  return events.find(e => e.slug === slug) ?? null;
}

/**
 * Fetch trending events sorted by likes (descending).
 */
export async function getTrendingEvents(limit = 6): Promise<Event[]> {
  const { data, error } = await getClient()
    .from('events')
    .select(EVENT_SELECT)
    .order('likes', { ascending: false })
    .limit(limit * 3);

  if (error) {
    console.error('[supabase_lib] getTrendingEvents error:', error.message);
    return [];
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (data as unknown as EventWithRelations[])
    .map(transformEvent)
    .filter(e => e.startDateTime >= today.toISOString())
    .slice(0, limit);
}

/**
 * Return all unique city names from the cities table.
 */
export async function getEventCities(): Promise<string[]> {
  const cities = await getCities();
  return cities.map(c => c.name);
}

/**
 * Return all unique tags/categories from events.
 */
export async function getEventTags(): Promise<string[]> {
  const events = await getEvents({ upcomingOnly: false });
  return Array.from(new Set(events.flatMap(e => e.tags))).sort();
}

/**
 * Return all unique universities from events.
 */
export async function getEventUniversities(): Promise<string[]> {
  const events = await getEvents({ upcomingOnly: false });
  return Array.from(new Set(events.map(e => e.university))).sort();
}
