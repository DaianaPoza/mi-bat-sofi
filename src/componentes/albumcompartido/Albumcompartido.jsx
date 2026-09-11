
import floresSueltas from "../../assets/flores-hero-sueltas.png";
import florCuentaRegresiva from "../../assets/flor-cuenta-regresiva.png";
import floresCeremonia from "../../assets/flores-ceremonia-inferior.png";
import tituloNuestrosRecuerdos from "../../assets/titulo-nuestros-recuerdos.png";
import "./Albumcompartido.css";

const ALBUM_URL =
  "https://www.elgrandia.events/album/mibatsofi";

function GalleryIcon() {
  return (
    <svg
      className="album-compartido__gallery-icon"
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      <rect x="17" y="20" width="62" height="56" rx="5" />
      <circle cx="62" cy="37" r="6" />
      <path d="m24 67 18-20 13 14 8-9 10 15H24Z" />
      <path d="M27 14h46M23 82h50" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" />
      <path d="M5 14v5h14v-5" />
    </svg>
  );
}

function AlbumCompartido() {
  return (
    <section
      className="album-compartido"
      aria-labelledby="album-compartido-title"
    >
      <img
        className="album-compartido__flowers album-compartido__flowers--top"
        src={floresSueltas}
        alt=""
        aria-hidden="true"
      />

<img
  className="album-compartido__side-flower album-compartido__side-flower--left"
  src={florCuentaRegresiva}
  alt=""
  aria-hidden="true"
/>

<img
  className="album-compartido__side-flower album-compartido__side-flower--right"
  src={florCuentaRegresiva}
  alt=""
  aria-hidden="true"
/>





      <div className="album-compartido__content">
        <div className="album-compartido__icon-circle" aria-hidden="true">
          <GalleryIcon />
        </div>

       <h2 className="album-compartido__title" id="album-compartido-title">
  <img
    className="album-compartido__title-image"
    src={tituloNuestrosRecuerdos}
    alt="Nuestros recuerdos"
  />
</h2>

        <span className="album-compartido__divider" aria-hidden="true" />

        <p className="album-compartido__description">
          ¡Ayúdanos a capturar la noche!
          <br /> Dejen sus fotos y videos en este
          rincón digital para guardarlos todos juntos.
        </p>

        <a
          className="album-compartido__button"
          href={ALBUM_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir la carpeta compartida para subir fotos y videos"
        >
          <UploadIcon />
          <span>Subir fotos y videos</span>
        </a>
      </div>

      <img
        className="album-compartido__flowers album-compartido__flowers--bottom"
        src={floresSueltas}
        alt=""
        aria-hidden="true"
      />

<img
  className="album-compartido__ceremony-flowers"
  src={floresCeremonia}
  alt=""
  aria-hidden="true"
/>




    </section>
  );
}

export default AlbumCompartido;