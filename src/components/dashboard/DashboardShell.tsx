"use client";

import { DashboardProvider } from "./DashboardContext";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export function DashboardShell({
  societyId,
  children,
}: {
  societyId: string;
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider societyId={societyId}>
      <TooltipProvider>
        <div className="dashboard-scope flex h-screen">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </DashboardProvider>
  );
}
