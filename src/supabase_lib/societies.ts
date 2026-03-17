import { SupabaseClient } from '@supabase/supabase-js';
import { getClient } from './client';
import { transformSociety } from './transform';
import type {
  Society,
  SocietyWithUniversity,
  SocietyAccountWithStatus,
  SocietyAccountWithSociety,
  SocietyAccountApprovalStatusRow,
} from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

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

/**
 * Fetch all society_accounts for an authenticated user, joined with the society
 * and approval status. Used by the society picker page.
 */
export async function getSocietyAccountsForUser(
  supabase: SupabaseClient,
  userId: string
): Promise<SocietyAccountWithSociety[]> {
  const { data, error } = await supabase
    .from('society_accounts')
    .select(`
      *,
      society_account_approval_status(name),
      societies(*, universities(id, name))
    `)
    .eq('auth_user_id', userId);

  if (error) {
    console.error('[supabase_lib] getSocietyAccountsForUser error:', error.message);
    return [];
  }

  return (data ?? []) as unknown as SocietyAccountWithSociety[];
}

/**
 * Fetch all society_accounts with "pending" approval status, joined with societies.
 * Used by the admin applications page.
 */
export async function getPendingSocietyAccounts(
  supabase: SupabaseClient
): Promise<SocietyAccountWithSociety[]> {
  // Look up the "pending" status ID
  const { data: statusData, error: statusError } = await supabase
    .from('society_account_approval_status')
    .select('id')
    .eq('name', 'pending')
    .single();

  if (statusError || !statusData) {
    console.error('[supabase_lib] getPendingSocietyAccounts: could not find pending status:', statusError?.message);
    return [];
  }

  const { data, error } = await supabase
    .from('society_accounts')
    .select(`
      *,
      society_account_approval_status(name),
      societies(*, universities(id, name))
    `)
    .eq('status_id', statusData.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[supabase_lib] getPendingSocietyAccounts error:', error.message);
    return [];
  }

  return (data ?? []) as unknown as SocietyAccountWithSociety[];
}

/**
 * Fetch all approval status lookup rows.
 */
export async function getApprovalStatuses(
  supabase: SupabaseClient
): Promise<SocietyAccountApprovalStatusRow[]> {
  const { data, error } = await supabase
    .from('society_account_approval_status')
    .select('*');

  if (error) {
    console.error('[supabase_lib] getApprovalStatuses error:', error.message);
    return [];
  }

  return (data ?? []) as SocietyAccountApprovalStatusRow[];
}

/**
 * Fetch profile data (name, description, image URL) for a society.
 * Checks society_profiles first, falls back to societies table for any null fields.
 */
export async function getSocietyProfileData(
  societyId: string,
  supabase?: SupabaseClient
): Promise<{ name: string | null; description: string | null; imageUrl: string | null }> {
  const client = supabase ?? getClient();

  const { data: profileData } = await client
    .from('society_profiles')
    .select('name, description, image_url')
    .eq('society_id', societyId)
    .single();

  let name = profileData?.name ?? null;
  let description = profileData?.description ?? null;
  let imageUrl = profileData?.image_url ?? null;

  // Fall back to societies table for any missing fields
  if (!name || !description || !imageUrl) {
    const { data: societyData } = await client
      .from('societies')
      .select('name, description, image_url')
      .eq('id', societyId)
      .single();

    if (societyData) {
      name = name ?? societyData.name ?? null;
      description = description ?? societyData.description ?? null;
      imageUrl = imageUrl ?? societyData.image_url ?? null;
    }
  }

  return { name, description, imageUrl };
}

/**
 * Fetch the image URL for a society.
 * Checks society_profiles first, falls back to societies table.
 */
export async function getSocietyImageUrl(societyId: string, supabase?: SupabaseClient): Promise<string | null> {
  const client = supabase ?? getClient();

  const { data: profileData } = await client
    .from('society_profiles')
    .select('image_url')
    .eq('society_id', societyId)
    .single();

  if (profileData?.image_url) {
    return profileData.image_url;
  }

  const { data: societyData } = await client
    .from('societies')
    .select('image_url')
    .eq('id', societyId)
    .single();

  return societyData?.image_url ?? null;
}

/**
 * Fetch a single society_account for a user + society pair.
 * Used for auth checks on the society dashboard.
 */
export async function getSocietyAccount(
  supabase: SupabaseClient,
  userId: string,
  societyId: string
): Promise<SocietyAccountWithStatus | null> {
  const { data, error } = await supabase
    .from('society_accounts')
    .select('*, society_account_approval_status(name)')
    .eq('auth_user_id', userId)
    .eq('society_id', societyId)
    .single();

  if (error || !data) {
    if (error?.code !== 'PGRST116') {
      console.error('[supabase_lib] getSocietyAccount error:', error?.message);
    }
    return null;
  }

  return data as unknown as SocietyAccountWithStatus;
}

/**
 * Update a society's profile details (name and/or description) via edge function.
 */
export async function updateSocietyProfileDetails(
  supabase: SupabaseClient,
  societyId: string,
  fields: { name?: string; description?: string }
): Promise<{ success: boolean; error?: string }> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return { success: false, error: 'Not authenticated' };

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { success: false, error: 'Session expired — please sign in again' };

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/set-society-profile-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ society_id: societyId, ...fields }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { success: false, error: data.error ?? `HTTP ${res.status}` };
    }

    return { success: true };
  } catch (err) {
    console.error('[supabase_lib] updateSocietyProfileDetails error:', err);
    return { success: false, error: 'Network error' };
  }
}

/**
 * Upload a society's profile image via edge function.
 * Accepts a Blob (e.g. from canvas.toBlob) rather than a File.
 */
export async function updateSocietyProfileImage(
  supabase: SupabaseClient,
  societyId: string,
  imageBlob: Blob
): Promise<{ imageUrl: string | null; error?: string }> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return { imageUrl: null, error: 'Not authenticated' };

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { imageUrl: null, error: 'Session expired — please sign in again' };

  try {
    const formData = new FormData();
    formData.append('society_id', societyId);
    formData.append('image', imageBlob, 'profile.jpg');

    const res = await fetch(`${SUPABASE_URL}/functions/v1/set-society-profile-image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { imageUrl: null, error: data.error ?? `HTTP ${res.status}` };
    }

    const data = await res.json();
    return { imageUrl: data.image_url ?? null };
  } catch (err) {
    console.error('[supabase_lib] updateSocietyProfileImage error:', err);
    return { imageUrl: null, error: 'Network error' };
  }
}
