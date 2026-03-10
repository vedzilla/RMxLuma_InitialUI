'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AdminSignOutButton from '../AdminSignOutButton';
import { createAuthBrowserClient } from '@/supabase_lib/auth/browser';

interface Application {
  id: string;
  authUserId: string;
  societyId: string;
  societyName: string;
  societyImageUrl: string | null;
  universityName: string | null;
  instagramHandle: string | null;
  appliedAt: string;
  userName: string | null;
  userEmail: string | null;
}

interface ApprovalStatus {
  id: string;
  name: string;
}

interface ApplicationsPageClientProps {
  initialApplications: Application[];
  approvalStatuses: ApprovalStatus[];
}

export default function ApplicationsPageClient({
  initialApplications,
  approvalStatuses,
}: ApplicationsPageClientProps) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAction = useCallback(async (app: Application, action: 'approve' | 'deny') => {
    setError(null);

    const statusName = action === 'approve' ? 'approved' : 'rejected';
    const statusId = approvalStatuses.find((s) => s.name === statusName)?.id;

    if (!statusId) {
      setError(`Could not find "${statusName}" status. Please refresh and try again.`);
      return;
    }

    // Optimistic: remove immediately
    setApplications((prev) => prev.filter((a) => a.id !== app.id));

    try {
      const supabase = createAuthBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setError('Session expired. Please sign in again.');
        setApplications((prev) => [...prev, app]);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/society-account-set-approval`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            society_id: app.societyId,
            auth_user_id: app.authUserId,
            status_id: statusId,
          }),
        }
      );

      if (!res.ok) {
        const body = await res.text();
        setError(`Failed to ${action}: ${body || res.statusText}`);
        setApplications((prev) => [...prev, app]);
      }
    } catch (err) {
      setError(`Network error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setApplications((prev) => [...prev, app]);
    }
  }, [approvalStatuses]);

  const query = search.toLowerCase().trim();
  const filtered = applications.filter(
    (a) =>
      a.societyName.toLowerCase().includes(query) ||
      a.authUserId.toLowerCase().includes(query) ||
      (a.universityName?.toLowerCase().includes(query) ?? false) ||
      (a.instagramHandle?.toLowerCase().includes(query) ?? false) ||
      (a.userName?.toLowerCase().includes(query) ?? false) ||
      (a.userEmail?.toLowerCase().includes(query) ?? false)
  );

  // Group by society
  const grouped = filtered.reduce<Record<string, Application[]>>((acc, app) => {
    if (!acc[app.societyName]) acc[app.societyName] = [];
    acc[app.societyName].push(app);
    return acc;
  }, {});

  const societyNames = Object.keys(grouped).sort();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[var(--surface)] border-b border-[var(--border)] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Image
              src="/logos/rm-dot-logo.png"
              alt="RedefineMe"
              width={120}
              height={30}
            />
          </Link>
          <span className="text-xs font-medium bg-[var(--accentSoft)] text-[var(--accent)] px-2 py-0.5 rounded-full">
            Admin
          </span>
        </div>
        <AdminSignOutButton />
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Back link + heading */}
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors mb-4"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold text-[var(--text)]">
            Society Applications
          </h1>
          <span className="text-sm text-[var(--muted)]">
            {applications.length} pending
          </span>
        </div>
        <p className="text-[var(--muted)] mb-6">
          Review and approve society ownership requests from committee members.
        </p>

        {/* Error banner */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Search */}
        <div className="relative mb-8">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
          >
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, society, university, or handle..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm placeholder:text-[var(--muted)] outline-none transition-shadow focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
          />
        </div>

        {/* Applications list */}
        {societyNames.length === 0 ? (
          <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] p-12 text-center">
            <p className="text-[var(--muted)]">
              {applications.length === 0
                ? 'All applications have been reviewed.'
                : 'No applications match your search.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {societyNames.map((society) => (
              <div
                key={society}
                className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] overflow-hidden"
              >
                {/* Society header */}
                {(() => {
                  const firstApp = grouped[society][0];
                  return (
                    <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--bg)] flex items-center gap-3">
                      {firstApp.societyImageUrl && (
                        <Image
                          src={firstApp.societyImageUrl}
                          alt={society}
                          width={32}
                          height={32}
                          className="rounded-full object-cover shrink-0"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <h2 className="text-sm font-semibold text-[var(--text)]">
                          {society}
                          <span className="ml-2 text-xs font-normal text-[var(--muted)]">
                            {grouped[society].length} application{grouped[society].length !== 1 ? 's' : ''}
                          </span>
                        </h2>
                        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                          {firstApp.universityName && <span>{firstApp.universityName}</span>}
                          {firstApp.universityName && firstApp.instagramHandle && <span>&middot;</span>}
                          {firstApp.instagramHandle && <span>@{firstApp.instagramHandle}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Applicant rows */}
                <div className="divide-y divide-[var(--border)]">
                  {grouped[society].map((app) => {
                    return (
                      <div
                        key={app.id}
                        className="px-5 py-3.5 flex items-center justify-between gap-4"
                      >
                        {/* Left: user info */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            {app.userName || app.userEmail ? (
                              <>
                                {app.userName && (
                                  <span className="text-sm font-medium text-[var(--text)]">
                                    {app.userName}
                                  </span>
                                )}
                                {app.userEmail && (
                                  <span className="text-xs text-[var(--muted)]">
                                    {app.userEmail}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="text-xs text-[var(--muted)] font-mono">
                                {app.authUserId.slice(0, 8)}...
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-[var(--muted)]">
                            <span>Applied {new Date(app.appliedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                        </div>

                        {/* Right: action buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleAction(app, 'approve')}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(app, 'deny')}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
                          >
                            Deny
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
