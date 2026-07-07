import { useEffect, useRef } from "react";

export default function Dashboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.4 + 0.4,
      speed: Math.random() * 0.4 + 0.15,
      alpha: Math.random() * 0.6 + 0.35,
    }));

    let animationId = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(render);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas id="starfield" ref={canvasRef} />
      <div className="page">
        <div className="topbar">
          <div>Starting Soon</div>
          <div className="socials">
            <a href="#">f</a>
            <a href="#">t</a>
            <a href="#">yt</a>
            <a href="#">ig</a>
          </div>
        </div>

        <main className="hero">
          <p className="eyebrow">Starting Soon</p>
          <h1 className="title">Journey Begins In</h1>

          <div className="countdown">
            <div className="unit">
              <div className="value" id="days">
                02
              </div>
              <div className="label">Days</div>
            </div>
            <div className="unit">
              <div className="value" id="hours">
                11
              </div>
              <div className="label">Hours</div>
            </div>
            <div className="unit">
              <div className="value" id="minutes">
                56
              </div>
              <div className="label">Minutes</div>
            </div>
            <div className="unit">
              <div className="value" id="seconds">
                06
              </div>
              <div className="label">Seconds</div>
            </div>
          </div>

          <p className="subtext">
            Hold tight as we prepare for launching the most outlandish new
            product ever.
          </p>
        </main>

        <div className="footer-note">© Your Company Name</div>
        <div className="mountains"></div>
      </div>
    </>
  );
}
