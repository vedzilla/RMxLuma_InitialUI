import { getClient } from './client';
import { transformCity } from './transform';
import type { City, CityRow } from './types';

/**
 * Fetch all cities.
 */
export async function getCities(): Promise<City[]> {
  const { data, error } = await getClient()
    .from('cities')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('[supabase_lib] getCities error:', error.message);
    return [];
  }

  return (data as CityRow[]).map(transformCity);
}

/**
 * Fetch a single city by its slug (derived from name).
 */
export async function getCityBySlug(slug: string): Promise<City | null> {
  const cities = await getCities();
  return cities.find(c => c.slug === slug) ?? null;
}
