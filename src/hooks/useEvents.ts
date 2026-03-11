"use client";

import { useState, useCallback } from "react";
import type { DashboardEvent } from "@/lib/supabase/types";
import { mockEvents } from "@/lib/mock-data";

// WARNING: All mutations (createEvent, updateEvent, deleteEvent) are currently mock implementations
// that only modify local state. When replacing with real Supabase calls, ensure that:
// 1. Supabase RLS policies restrict writes to events owned by the caller's society
// 2. OR edge functions verify society ownership before performing mutations
// Do NOT rely solely on the client-side layout auth check for authorization.
export function useEvents(societyId: string | undefined) {
  const [events, setEvents] = useState<DashboardEvent[]>(mockEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    // Mock: just use static data
    setLoading(true);
    setEvents(mockEvents);
    setLoading(false);
  }, []);

  const createEvent = async (formData: Record<string, unknown>) => {
    // Mock: add to local state
    const newEvent: DashboardEvent = {
      id: `e-${Date.now()}`,
      title: (formData.title as string) ?? "New Event",
      description: (formData.description as string) ?? "",
      date: new Date().toISOString(),
      status: "ingested",
      source: "manual",
      likes: 0,
      attending: 0,
      categories: [],
      imageUrl: null,
      registrationUrl: null,
      isOnline: false,
      isFree: true,
      price: null,
      schedules: [],
    };
    setEvents((prev) => [newEvent, ...prev]);
    return { event_id: newEvent.id, status: "ingested" };
  };

  const updateEvent = async (eventId: string, formData: Record<string, unknown>) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, ...(formData as Partial<DashboardEvent>) }
          : e
      )
    );
  };

  const deleteEvent = async (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  return { events, loading, error, fetchEvents, createEvent, updateEvent, deleteEvent };
}
