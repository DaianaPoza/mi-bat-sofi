import fotoSofi from "../../assets/sofi-galeria.jpeg";
import "./Galeria1.css";

function Galeria() {
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

export default Galeria;