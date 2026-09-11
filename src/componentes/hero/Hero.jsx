import { useRef, useState } from "react";
import floresInferiores from "../../assets/flores-hero-inferior.png";
import floresSueltas from "../../assets/flores-hero-sueltas.png";
import tituloMiBat from "../../assets/texto-mibat.png";
import tituloSofi from "../../assets/texto-sofi.png";



import "./Hero.css";

function Hero({ onPlay }) {
  const [started, setStarted] = useState(false);

const [isPlaying, setIsPlaying] = useState(false);

  const buttonRef = useRef(null);

  const handlePlay = async () => {
    if (!started && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const margin = window.innerWidth <= 480 ? 18 : 24;
      const finalLeft = window.innerWidth - rect.width - margin;
      const finalTop = window.innerHeight - rect.height - margin;

      buttonRef.current.style.setProperty(
        "--start-x",
        `${rect.left - finalLeft}px`,
      );
      buttonRef.current.style.setProperty(
        "--start-y",
        `${rect.top - finalTop}px`,
      );

      setStarted(true);
    }

    try {
  const playing = await onPlay?.();
  setIsPlaying(Boolean(playing));
} catch (error) {
  console.error("No se pudo reproducir la música:", error);
}
  };

  return (
    <section className="hero" aria-labelledby="hero-name">
      <img
        className="hero__flowers-top"
        src={floresSueltas}
        alt=""
        aria-hidden="true"
      />

      <div className="hero__content">
        

<p className="hero__subtitle">
  <img
    className="hero__subtitle-image"
    src={tituloMiBat}
    alt="Mi Bat"
  />
</p>

<h1 className="hero__name" id="hero-name">
  <img
    className="hero__name-image"
    src={tituloSofi}
    alt="Sofi"
  />
</h1>





        <div
          className="hero__date"
          aria-label="Sábado 10 de octubre de 2026 a las 21 horas"
        >
          <span className="hero__date-side">SÁBADO</span>
          <span className="hero__day">10</span>
          <span className="hero__date-side">OCT 2026</span>
        </div>

        <p className="hero__time">21:00 HS</p>

        <div className={`hero__player ${started ? "hero__player--started" : ""}`}>
          <button
            ref={buttonRef}
            className="hero__play"
            type="button"
            onClick={handlePlay}


          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
>
  {isPlaying ? (
    <span className="hero__pause-icon" aria-hidden="true">
      <span />
      <span />
    </span>
  ) : (
    <span className="hero__play-triangle" aria-hidden="true" />
  )}
</button>



          {!started && <span className="hero__play-label">DALE PLAY</span>}
        </div>
      </div>

      <img
        className="hero__flowers-bottom"
        src={floresInferiores}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}

export default Hero;