import florCeremonia from "../../assets/flor-ceremonia.png";
import floresSuperiores from "../../assets/flores-ceremonia-superior.png";
import floresInferiores from "../../assets/flores-ceremonia-inferior.png";
import "./Ceremonia.css";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Lavalle+54%2C+Bah%C3%ADa+Blanca";

function ChurchIcon() {
  return (
    <svg
      className="ceremonia__church-icon"
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      <path d="M16 78h64M23 78V43h14v35M59 78V43h14v35" />

      <path d="M37 78V33l11-10 11 10v45M43 78V59c0-4 2-7 5-7s5 3 5 7v19" />

      <path d="M48 23V12m0 0h7m-7 0V7M44 40h8M48 36v8" />

      <path d="M19 43h18M59 43h18" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

function Ceremonia() {
  return (
    <section className="ceremonia" aria-labelledby="ceremonia-title">
      {/* Flores ubicadas en el margen superior */}
      <img
        className="ceremonia__flowers-edge ceremonia__flowers-edge--top"
        src={floresSuperiores}
        alt=""
        aria-hidden="true"
      />

      {/* Ramo e icono centrados respecto de toda la sección */}
      <div className="ceremonia__visual" aria-hidden="true">
        <img
          className="ceremonia__flower"
          src={florCeremonia}
          alt=""
        />

        <div className="ceremonia__icon-circle">
          <ChurchIcon />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="ceremonia__content">
        <h2 className="ceremonia__title" id="ceremonia-title">
          Ceremonia
        </h2>

        <span className="ceremonia__divider" aria-hidden="true" />

        <div className="ceremonia__event">
          <h3>KABALAT SHABAT</h3>
          <p>viernes 9 de octubre, 19 horas</p>
        </div>

        <div className="ceremonia__event">
          <h3>LECTURA DE LA TORÁ</h3>
          <p>Sábado 10 de octubre, 18:30 horas</p>
        </div>

        <p className="ceremonia__address">
          Dirección: Lavalle 54, Bahía Blanca.
        </p>

        <a
          className="ceremonia__map-button"
          href={MAP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir la ubicación de la ceremonia en Google Maps"
        >
          <LocationIcon />
          <span>Cómo llegar</span>
        </a>
      </div>

      {/* Flores ubicadas en el margen inferior */}
      <img
        className="ceremonia__flowers-edge ceremonia__flowers-edge--bottom"
        src={floresInferiores}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}

export default Ceremonia;