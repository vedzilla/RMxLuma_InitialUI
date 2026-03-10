"use client";

import { createContext, useContext } from "react";

interface DashboardContextValue {
  societyId: string;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({
  societyId,
  children,
}: {
  societyId: string;
  children: React.ReactNode;
}) {
  return (
    <DashboardContext.Provider value={{ societyId }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboardContext must be used within a DashboardProvider");
  }
  return ctx;
}
