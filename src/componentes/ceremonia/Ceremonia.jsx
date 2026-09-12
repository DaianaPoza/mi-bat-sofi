import florCeremonia from "../../assets/flor-ceremonia.png";
import floresSuperiores from "../../assets/flores-ceremonia-superior.png";
import floresInferiores from "../../assets/flores-ceremonia-inferior.png";
import tituloCeremonia from "../../assets/texto-ceremonia.png";


import "./Ceremonia.css";

const MAP_URL =
    "https://www.google.com/maps/search/?api=1&query=Espa%C3%B1a+42%2C+Bah%C3%ADa+Blanca";



function getTipoInvitacion() {
  const params = new URLSearchParams(
    window.location.search,
  );

  return params.get("tipo") === "fiesta"
    ? "fiesta"
    : "completa";
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

const tipoInvitacion = getTipoInvitacion();

  const mostrarViernes =
    tipoInvitacion === "completa";






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
      </div>

      {/* Contenido principal */}
      <div className="ceremonia__content">
       <h2 className="ceremonia__title" id="ceremonia-title">
  <img
    className="ceremonia__title-image"
    src={tituloCeremonia}
    alt="Ceremonia"
  />
</h2>

        <span className="ceremonia__divider" aria-hidden="true" />






       {mostrarViernes && (
  <div className="ceremonia__event">
    <h3>KABALAT SHABAT</h3>
    <p>Viernes 9 de octubre, 19 horas</p>
  </div>
)}






        <div className="ceremonia__event">
          <h3>LECTURA DE LA TORÁ</h3>
          <p>Sábado 10 de octubre, 18:30 horas</p>
        </div>

        <p className="ceremonia__address">
          Dirección: España 42, Bahía Blanca
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