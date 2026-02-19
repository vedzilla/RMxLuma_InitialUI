import { getClient } from './client';
import { transformUniversity } from './transform';
import type { University, UniversityWithCity } from './types';

/**
 * Fetch all universities.
 */
export async function getUniversities(): Promise<University[]> {
  const { data, error } = await getClient()
    .from('universities')
    .select('*, cities(id, name)')
    .order('name', { ascending: true });

  if (error) {
    console.error('[supabase_lib] getUniversities error:', error.message);
    return [];
  }

  return (data as UniversityWithCity[]).map(transformUniversity);
}

/**
 * Fetch a single university by its short name (e.g. 'UoM').
 */
export async function getUniversityByShortName(shortName: string): Promise<University | null> {
  const { data, error } = await getClient()
    .from('universities')
    .select('*, cities(id, name)')
    .eq('short_name', shortName)
    .single();

  if (error || !data) {
    if (error?.code !== 'PGRST116') {
      console.error('[supabase_lib] getUniversityByShortName error:', error?.message);
    }
    return null;
  }

  return transformUniversity(data as UniversityWithCity);
}
