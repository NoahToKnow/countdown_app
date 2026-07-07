import { useEffect, useState, type FormEvent } from "react";
import type { CountdownEvent } from "../types";

interface Props {
  initial?: CountdownEvent | null;
  onSubmit: (data: { title: string; description: string; targetDate: string }) => void;
  onCancel: () => void;
}

function splitISO(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  };
}

export default function CountdownForm({ initial, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDescription(initial.description);
      const parts = splitISO(initial.targetDate);
      setDate(parts.date);
      setTime(parts.time);
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
    }
    setError(null);
  }, [initial]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!date || !time) {
      setError("Date and time are required.");
      return;
    }
    const target = new Date(`${date}T${time}`);
    if (isNaN(target.getTime())) {
      setError("Invalid date or time.");
      return;
    }
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      targetDate: target.toISOString(),
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">{initial ? "Edit countdown" : "New countdown"}</h2>

      <label className="form__field">
        <span>Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Launch Day"
          autoFocus
        />
      </label>

      <label className="form__field">
        <span>Description (optional)</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Anything you want to remember about this event"
        />
      </label>

      <div className="form__row">
        <label className="form__field">
          <span>Target date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="form__field">
          <span>Target time</span>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
      </div>

      {error && <div className="form__error">{error}</div>}

      <div className="form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          {initial ? "Save changes" : "Create countdown"}
        </button>
      </div>
    </form>
  );
}
