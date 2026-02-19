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
  event_images(post_id, image_index, post_images(s3_url))
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

  let query = getClient()
    .from('events')
    .select(EVENT_SELECT)
    .order('event_date', { ascending: true });

  if (upcomingOnly) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    query = query.gte('event_date', today.toISOString());
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[supabase_lib] getEvents error:', error.message);
    return [];
  }

  const events = (data as unknown as EventWithRelations[]).map(transformEvent);

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
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await getClient()
    .from('events')
    .select(EVENT_SELECT)
    .gte('event_date', today.toISOString())
    .order('likes', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[supabase_lib] getTrendingEvents error:', error.message);
    return [];
  }

  return (data as unknown as EventWithRelations[]).map(transformEvent);
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
