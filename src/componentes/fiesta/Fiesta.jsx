import floresSuperiores from "../../assets/flores-ceremonia-superior.png";
import floresInferiores from "../../assets/flores-ceremonia-inferior.png";
import "./Fiesta.css";
import floresSueltas from "../../assets/flores-hero-sueltas.png";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Punto+Alem+Eventos%2C+Av.+Alem+862%2C+Bah%C3%ADa+Blanca";

function PartyIcon() {
  return (
    <svg
      className="fiesta__party-icon"
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="48" cy="29" r="15" />
      <path d="M33 29h30M48 14c5 5 7 10 7 15s-2 10-7 15M48 14c-5 5-7 10-7 15s2 10 7 15M48 14v30" />
      <rect x="14" y="52" width="27" height="29" rx="3" />
      <rect x="55" y="52" width="27" height="29" rx="3" />
      <circle cx="27.5" cy="68" r="7" />
      <circle cx="68.5" cy="68" r="7" />
      <path d="M19 58h8M60 58h8M22 44l-5-5M74 44l5-5M29 38v-7M67 38v-7" />
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

function Fiesta() {
  return (
    <section className="fiesta" aria-labelledby="fiesta-title">
      <img
        className="fiesta__flowers fiesta__flowers--top"
        src={floresSuperiores}
        alt=""
        aria-hidden="true"
      />


<img
  className="fiesta__loose-flowers fiesta__loose-flowers--upper"
  src={floresSueltas}
  alt=""
  aria-hidden="true"
/>

<img
  className="fiesta__loose-flowers fiesta__loose-flowers--lower"
  src={floresSueltas}
  alt=""
  aria-hidden="true"
/>

<img
  className="fiesta__loose-flowers fiesta__loose-flowers--lower"
  src={floresSueltas}
  alt=""
  aria-hidden="true"
/>




      <div className="fiesta__content">
        <div className="fiesta__icon-circle" aria-hidden="true">
          <PartyIcon />
        </div>

        <h2 className="fiesta__title" id="fiesta-title">
          Fiesta
        </h2>

        <span className="fiesta__divider" aria-hidden="true" />

        <div className="fiesta__details">
          <p>Sábado 10 de octubre</p>
          <p className="fiesta__time">21 HORAS</p>
          <p>Punto Alem Eventos</p>
          <p>Av. Alem 862, Bahía Blanca.</p>
        </div>

        <a
          className="fiesta__map-button"
          href={MAP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir la ubicación de Punto Alem Eventos en Google Maps"
        >
          <LocationIcon />
          <span>Cómo llegar</span>
        </a>
      </div>

      <img
        className="fiesta__flowers fiesta__flowers--bottom"
        src={floresInferiores}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}

export default Fiesta;