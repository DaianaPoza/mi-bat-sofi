import { useRef } from "react";
import Hero from "./componentes/hero/Hero";
import Galeria from "./componentes/galeria1/Galeria1";
import CuentaRegresiva from "./componentes/cuentaregresiva/Cuentaregresiva";
import Ceremonia from "./componentes/ceremonia/Ceremonia";
import Fiesta from "./componentes/fiesta/Fiesta";
import Dresscode from "./componentes/dresscode/Dresscode";
import Galeria2 from "./componentes/galeria2/Galeria2";



function App() {
  const audioRef = useRef(null);

  const handleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <Hero onPlay={handleMusic} />

      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/cancion.mp3`}
        preload="auto"
        loop
      />

      {/* Las próximas secciones de la invitación irán debajo del Hero. */}

      <Galeria />
      <CuentaRegresiva />
      <Ceremonia />
      <Fiesta />
      <Dresscode/>
      <Galeria2 />

    </>
  );
}

export default App;
