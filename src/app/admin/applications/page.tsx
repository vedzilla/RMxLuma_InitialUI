import { createAuthServerClient } from '@/supabase_lib/auth/server';
import { isAdmin } from '@/supabase_lib/users';
import { redirect } from 'next/navigation';
import ApplicationsPageClient from './ApplicationsPageClient';

export default async function ApplicationsPage() {
  const supabase = await createAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !(await isAdmin(supabase, user.id))) {
    redirect('/auth?error=unauthorized');
  }

  return <ApplicationsPageClient />;
}
