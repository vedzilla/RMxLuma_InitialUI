import { getClient } from './client';
import { transformSociety } from './transform';
import type { Society, SocietyWithUniversity } from './types';

const SOCIETY_SELECT = `
  *, universities(id, name, short_name, created_at)
`.trim();

/**
 * Fetch all societies with their associated university.
 */
export async function getSocieties(): Promise<Society[]> {
  const { data, error } = await getClient()
    .from('societies')
    .select(SOCIETY_SELECT)
    .order('name', { ascending: true });

  if (error) {
    console.error('[supabase_lib] getSocieties error:', error.message);
    return [];
  }

  return (data as unknown as SocietyWithUniversity[]).map(transformSociety);
}

/**
 * Fetch a single society by its Instagram handle.
 */
export async function getSocietyByHandle(handle: string): Promise<Society | null> {
  const { data, error } = await getClient()
    .from('societies')
    .select(SOCIETY_SELECT)
    .eq('instagram_handle', handle)
    .single();

  if (error || !data) {
    if (error?.code !== 'PGRST116') {
      console.error('[supabase_lib] getSocietyByHandle error:', error?.message);
    }
    return null;
  }

  return transformSociety(data as unknown as SocietyWithUniversity);
}

/**
 * Fetch all societies belonging to a given university (by university id).
 */
export async function getSocietiesByUniversity(universityId: string): Promise<Society[]> {
  const { data, error } = await getClient()
    .from('societies')
    .select(SOCIETY_SELECT)
    .eq('university_id', universityId)
    .order('name', { ascending: true });

  if (error) {
    console.error('[supabase_lib] getSocietiesByUniversity error:', error.message);
    return [];
  }

  return (data as unknown as SocietyWithUniversity[]).map(transformSociety);
}
