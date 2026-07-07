import { useEffect, useState } from "react";

interface Props {
  targetDate: string;
  mode?: "dashboard" | "widget";
}

interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function computeParts(targetMs: number): TimeParts {
  const diff = targetMs - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    expired: false,
  };
}

export default function CountdownTimer({ targetDate, mode = "dashboard" }: Props) {
  const targetMs = new Date(targetDate).getTime();
  const [parts, setParts] = useState<TimeParts>(() => computeParts(targetMs));

  useEffect(() => {
    setParts(computeParts(targetMs));
    const id = setInterval(() => setParts(computeParts(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (parts.expired) {
    return (
      <div className={`timer timer--${mode} timer--expired`}>
        <div className="timer__complete">
          <span className="timer__complete-emoji">🎉</span>
          <span>Event Started!</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`timer timer--${mode}`}>
      <Tile label="Days" value={parts.days} />
      <Tile label="Hours" value={parts.hours} />
      <Tile label="Minutes" value={parts.minutes} />
      <Tile label="Seconds" value={parts.seconds} />
    </div>
  );
}

function Tile({ label, value }: { label: string; value: number }) {
  return (
    <div className="tile">
      <div className="tile__value">{String(value).padStart(2, "0")}</div>
      <div className="tile__label">{label}</div>
    </div>
  );
}
