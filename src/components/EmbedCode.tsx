import { useMemo, useState } from "react";

interface Props {
  eventId: string;
}

interface Preset {
  name: string;
  width: number;
  height: number;
}

const PRESETS: Preset[] = [
  { name: "Small", width: 300, height: 200 },
  { name: "Medium", width: 500, height: 300 },
  { name: "Large", width: 800, height: 500 },
  { name: "Banner", width: 1000, height: 250 },
];

export default function EmbedCode({ eventId }: Props) {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(300);
  const [copied, setCopied] = useState(false);

  const widgetUrl = useMemo(() => {
    const { origin, pathname } = window.location;
    // pathname already contains the Vite base (e.g. "/countdown_app/") so we
    // reuse it verbatim; then append the HashRouter route.
    return `${origin}${pathname}#/widget/${eventId}`;
  }, [eventId]);

  const embedCode = `<iframe src="${widgetUrl}" width="${width}" height="${height}" frameborder="0" title="Countdown Widget"></iframe>`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="embed">
      <div className="embed__presets">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            className="btn btn--tiny"
            onClick={() => {
              setWidth(p.width);
              setHeight(p.height);
            }}
          >
            {p.name} · {p.width}×{p.height}
          </button>
        ))}
      </div>

      <div className="embed__size">
        <label>
          <span>Width</span>
          <input
            type="number"
            min={100}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value) || 0)}
          />
        </label>
        <label>
          <span>Height</span>
          <input
            type="number"
            min={100}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value) || 0)}
          />
        </label>
      </div>

      <textarea className="embed__code" readOnly value={embedCode} rows={3} />

      <div className="embed__actions">
        <button type="button" className="btn btn--primary" onClick={copy}>
          {copied ? "Copied!" : "Copy Embed Code"}
        </button>
        <a
          className="btn btn--ghost"
          href={widgetUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open Widget
        </a>
      </div>

      <p className="embed__note">
        v1 stores countdowns in <code>localStorage</code>, so this iframe only
        renders in the browser/profile where the countdown was created.
      </p>
    </div>
  );
}
