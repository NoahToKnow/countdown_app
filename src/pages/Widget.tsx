import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { CountdownEvent } from "../types";
import { getEventById } from "../utils/storage";
import CountdownTimer from "../components/CountdownTimer";

export default function Widget() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<CountdownEvent | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (id) setEvent(getEventById(id));
    setLoaded(true);
  }, [id]);

  if (!loaded) return null;

  if (!event) {
    return (
      <div className="widget widget--missing">
        <h1>Countdown not found</h1>
        <p className="muted">
          This widget only renders in the browser/profile where the countdown
          was created.
        </p>
        <Link className="btn btn--primary" to="/">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="widget">
      <div className="widget__inner">
        <h1 className="widget__title">{event.title}</h1>
        {event.description && (
          <p className="widget__desc">{event.description}</p>
        )}
        <CountdownTimer targetDate={event.targetDate} mode="widget" />
      </div>
    </div>
  );
}
