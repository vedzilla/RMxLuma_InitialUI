"use client";

import { useState, useCallback } from "react";
import type { User } from "@supabase/supabase-js";
import type { SocietyAccountRow, SocietyRow, SocietyProfileRow } from "@/lib/supabase/types";
import { mockSociety, mockProfile, mockAccount } from "@/lib/mock-data";

interface SocietyAuth {
  user: User | null;
  account: SocietyAccountRow | null;
  society: SocietyRow | null;
  profile: SocietyProfileRow | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useSocietyAuth(): SocietyAuth {
  const [loading] = useState(false);

  const mockUser = {
    id: "auth-001",
    email: "cssoc@manchester.ac.uk",
  } as User;

  const signOut = async () => {
    // no-op in mock mode
  };

  const refresh = useCallback(async () => {
    // no-op in mock mode
  }, []);

  return {
    user: mockUser,
    account: mockAccount,
    society: mockSociety,
    profile: mockProfile,
    loading,
    signOut,
    refresh,
  };
}
