import { useState } from "react";
import type { CountdownEvent } from "../types";
import CountdownTimer from "./CountdownTimer";
import EmbedCode from "./EmbedCode";

interface Props {
  event: CountdownEvent;
  onEdit: () => void;
  onDelete: () => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CountdownCard({ event, onEdit, onDelete }: Props) {
  const [embedOpen, setEmbedOpen] = useState(false);
  const widgetHref = `#/widget/${event.id}`;

  return (
    <article className="card">
      <header className="card__header">
        <h3 className="card__title">{event.title}</h3>
        {event.description && <p className="card__desc">{event.description}</p>}
      </header>

      <CountdownTimer targetDate={event.targetDate} mode="dashboard" />

      <div className="card__target">{formatDate(event.targetDate)}</div>

      <div className="card__actions">
        <button type="button" className="btn btn--ghost" onClick={onEdit}>
          Edit
        </button>
        <button type="button" className="btn btn--danger" onClick={onDelete}>
          Delete
        </button>
        <a
          className="btn btn--ghost"
          href={widgetHref}
          target="_blank"
          rel="noreferrer"
        >
          Open Widget
        </a>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => setEmbedOpen((v) => !v)}
        >
          {embedOpen ? "Hide Embed" : "Copy Embed Code"}
        </button>
      </div>

      {embedOpen && <EmbedCode eventId={event.id} />}
    </article>
  );
}
