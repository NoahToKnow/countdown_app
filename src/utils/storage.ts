import type { CountdownEvent } from "../types";

const STORAGE_KEY = "countdown-events";

export interface CreateEventInput {
  title: string;
  description: string;
  targetDate: string;
}

export function getEvents(): CountdownEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CountdownEvent[]) : [];
  } catch {
    return [];
  }
}

export function saveEvents(events: CountdownEvent[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function createEvent(input: CreateEventInput): CountdownEvent {
  const event: CountdownEvent = {
    id: makeId(),
    title: input.title,
    description: input.description,
    targetDate: input.targetDate,
    createdAt: new Date().toISOString(),
  };
  const events = getEvents();
  events.push(event);
  saveEvents(events);
  return event;
}

export function updateEvent(
  id: string,
  changes: Partial<Omit<CountdownEvent, "id" | "createdAt">>,
): CountdownEvent | null {
  const events = getEvents();
  const idx = events.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  events[idx] = { ...events[idx], ...changes };
  saveEvents(events);
  return events[idx];
}

export function deleteEvent(id: string): void {
  saveEvents(getEvents().filter((e) => e.id !== id));
}

export function getEventById(id: string): CountdownEvent | null {
  return getEvents().find((e) => e.id === id) ?? null;
}

function makeId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
