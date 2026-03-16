import { getSocieties } from '@/supabase_lib/societies';
import UserRolesPageClient from './UserRolesPageClient';

export default async function UserRolesPage() {
  const societies = await getSocieties();
  return <UserRolesPageClient societies={societies} />;
}
