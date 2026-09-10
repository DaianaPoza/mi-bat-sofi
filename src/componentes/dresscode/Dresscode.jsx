import floresSuperiores from "../../assets/flores-ceremonia-superior.png";
import floresInferiores from "../../assets/flores-hero-inferior.png";
import floresSueltas from "../../assets/flores-hero-sueltas.png";
import "./Dresscode.css";

function DressCodeIcon() {
  return (
    <svg
      className="dresscode__icon"
      viewBox="0 0 120 96"
      fill="none"
      aria-hidden="true"
    >
      <path d="M25 15c4 7 9 10 15 10s11-3 15-10l6 15-10 7 9 42H20l9-42-10-7 6-15Z" />
      <path d="M40 25v54M29 37h22M30 79l10-20 10 20" />
      <path d="M75 17h26l7 18-8 4v40H76V39l-8-4 7-18Z" />
      <path d="m82 17 6 13 6-13M88 30v49M76 39l12 7 12-7M97 48v18" />
    </svg>
  );
}

function Dresscode() {
  return (
    <section className="dresscode" aria-labelledby="dresscode-title">
      <img
        className="dresscode__flowers dresscode__flowers--top"
        src={floresSuperiores}
        alt=""
        aria-hidden="true"
      />

      <img
        className="dresscode__loose-flowers dresscode__loose-flowers--upper"
        src={floresSueltas}
        alt=""
        aria-hidden="true"
      />

      <div className="dresscode__content">
        <div className="dresscode__icon-circle">
          <DressCodeIcon />
        </div>

        <h2 className="dresscode__title" id="dresscode-title">
          Dress Code
        </h2>

        <span className="dresscode__divider" aria-hidden="true" />

        <p className="dresscode__type">Elegante Sport</p>
      </div>

      <img
        className="dresscode__loose-flowers dresscode__loose-flowers--lower"
        src={floresSueltas}
        alt=""
        aria-hidden="true"
      />

      <img
        className="dresscode__flowers dresscode__flowers--bottom"
        src={floresInferiores}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}

export default Dresscode;