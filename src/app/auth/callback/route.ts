import { createAuthServerClient } from '@/supabase_lib/auth/server';
import { isAdmin } from '@/supabase_lib/users';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createAuthServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Role-based redirect: admins → /admin, everyone else → /society/dashboard
        const destination = (await isAdmin(supabase, user.id))
          ? '/admin'
          : '/society/dashboard';

        const forwardedHost = request.headers.get('x-forwarded-host');
        if (forwardedHost) {
          const proto = request.headers.get('x-forwarded-proto') || 'https';
          return NextResponse.redirect(`${proto}://${forwardedHost}${destination}`);
        }
        return NextResponse.redirect(`${origin}${destination}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth?error=auth_code_error`);
}
