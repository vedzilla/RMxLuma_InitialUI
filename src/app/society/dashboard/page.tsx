import Image from 'next/image';
import { redirect } from 'next/navigation';
import { createAuthServerClient } from '@/supabase_lib/auth/server';
import SocietySignOutButton from './SocietySignOutButton';

export default async function SocietyDashboard() {
  const supabase = await createAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[var(--surface)] border-b border-[var(--border)] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logos/rm-dot-logo.png"
            alt="RedefineMe"
            width={120}
            height={30}
          />
          <span className="text-xs font-medium text-[var(--accent)] bg-[var(--accentSoft)] px-2 py-0.5 rounded-full">
            Society
          </span>
        </div>
        <SocietySignOutButton />
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-[var(--text)] mb-2">
          Hello World
        </h1>
        <p className="text-[var(--muted)]">
          You successfully logged in as <span className="font-medium text-[var(--text)]">{user.email}</span>.
        </p>
      </main>
    </div>
  );
}
