import { useEffect, useRef } from "react";

import Hero from "./componentes/hero/Hero";
import Galeria from "./componentes/galeria1/Galeria1";
import CuentaRegresiva from "./componentes/cuentaregresiva/Cuentaregresiva";
import Ceremonia from "./componentes/ceremonia/Ceremonia";
import Fiesta from "./componentes/fiesta/Fiesta";
import Dresscode from "./componentes/dresscode/Dresscode";
import Galeria2 from "./componentes/galeria2/Galeria2";
import AlbumCompartido from "./componentes/albumcompartido/Albumcompartido";
import Confirmacion from "./componentes/confirmar/Confirmar";
import PanelDemo from "./componentes/panel/Panel";

import "./App.css";

function App() {
  const audioRef = useRef(null);

  const params = new URLSearchParams(
    window.location.search,
  );

  const showPanel =
    params.get("panel") === "cliente";

  useEffect(() => {
    // Si estamos viendo el panel, no necesitamos
    // ejecutar las animaciones de la invitación.
    if (showPanel) {
      return undefined;
    }

    const sections =
      document.querySelectorAll(".reveal-section");

    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => {
        section.classList.add(
          "reveal-section--visible",
        );
      });

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "reveal-section--visible",
            );

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [showPanel]);

  const handleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return false;

    if (audio.paused) {
      await audio.play();
      return true;
    }

    audio.pause();
    return false;
  };

  if (showPanel) {
    return <PanelDemo />;
  }

  return (
    <>
      <Hero onPlay={handleMusic} />

      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/cancion.mp3`}
        preload="auto"
        loop
      />

      <div className="reveal-section">
        <Galeria />
      </div>

      <div className="reveal-section">
        <CuentaRegresiva />
      </div>

      <div className="reveal-section">
        <Ceremonia />
      </div>

      <div className="reveal-section">
        <Fiesta />
      </div>

      <div className="reveal-section">
        <Dresscode />
      </div>

      <div className="reveal-section">
        <Galeria2 />
      </div>

      <div className="reveal-section">
        <AlbumCompartido />
      </div>

      <div className="reveal-section">
        <Confirmacion />
      </div>
    </>
  );
}

export default App;
