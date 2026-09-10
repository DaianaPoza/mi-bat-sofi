import fotoSofi from "../../assets/sofi-galeria2.png";
import "./Galeria2.css";

function Galeria2() {
  return (
    <section className="galeria" aria-label="Fotografía de Sofi">
      <figure className="galeria__frame">
        <img
          className="galeria__photo"
          src={fotoSofi}
          alt="Sofi"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </section>
  );
}

export default Galeria2;