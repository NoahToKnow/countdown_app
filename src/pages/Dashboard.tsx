import { useEffect, useMemo, useState } from "react";
import type { CountdownEvent } from "../types";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../utils/storage";
import CountdownCard from "../components/CountdownCard";
import CountdownForm from "../components/CountdownForm";

export default function Dashboard() {
  const [events, setEvents] = useState<CountdownEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CountdownEvent | null>(null);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const sorted = useMemo(
    () => [...events].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [events],
  );

  function openCreate() {
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(ev: CountdownEvent) {
    setEditing(ev);
    setShowForm(true);
  }

  function handleDelete(ev: CountdownEvent) {
    if (!confirm(`Delete "${ev.title}"?`)) return;
    deleteEvent(ev.id);
    setEvents(getEvents());
  }

  function handleSubmit(data: {
    title: string;
    description: string;
    targetDate: string;
  }) {
    if (editing) {
      updateEvent(editing.id, data);
    } else {
      createEvent(data);
    }
    setEvents(getEvents());
    setShowForm(false);
    setEditing(null);
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Countdown Widgets</h1>
          <p className="muted">
            Personal countdowns stored in your browser. Embed them anywhere on
            this device.
          </p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openCreate}>
          + New countdown
        </button>
      </header>

      {showForm && (
        <div className="dashboard__form">
          <CountdownForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="empty">
          <h2>No countdowns yet</h2>
          <p className="muted">Create your first countdown to get started.</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={openCreate}
          >
            Create countdown
          </button>
        </div>
      ) : (
        <div className="grid">
          {sorted.map((ev) => (
            <CountdownCard
              key={ev.id}
              event={ev}
              onEdit={() => openEdit(ev)}
              onDelete={() => handleDelete(ev)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
