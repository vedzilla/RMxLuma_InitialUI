import { getClient } from './client';
import { transformCategory } from './transform';
import type { Category, CategoryRow } from './types';

/**
 * Fetch all event categories.
 */
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await getClient()
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('[supabase_lib] getCategories error:', error.message);
    return [];
  }

  return (data as CategoryRow[]).map(transformCategory);
}
