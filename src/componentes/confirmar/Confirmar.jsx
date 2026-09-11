import { useState } from "react";
import { supabase } from "../../lib/supabase.js";
import tituloConfirmacion from "../../assets/titulo-confirma-asistencia.png";
import fondoConfirmacion from "../../assets/sofi-confirmacion.jpeg";

import "./Confirmar.css";

const EVENTO_SLUG = "mi-bat-sofi";

const opcionesCantidad = Array.from(
  { length: 10 },
  (_, index) => index + 1,
);

function getTipoInvitacion() {
  const params = new URLSearchParams(
    window.location.search,
  );

  return params.get("tipo") === "fiesta"
    ? "fiesta"
    : "completa";
}

const TIPO_INVITACION = getTipoInvitacion();

function Confirmacion() {
  const mostrarPreguntaViernes =
    TIPO_INVITACION === "completa";

  const [nombre, setNombre] = useState("");
  const [asistenciaViernes, setAsistenciaViernes] =
    useState("");
  const [asisteTemplo, setAsisteTemplo] =
    useState("");
  const [asisteFiesta, setAsisteFiesta] =
    useState("");
  const [cantidadBrindis, setCantidadBrindis] =
    useState(1);
  const [cantidadFiesta, setCantidadFiesta] =
    useState(1);
  const [menu, setMenu] = useState("");
  const [menuOtro, setMenuOtro] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] =
    useState("");
  const [enviando, setEnviando] =
    useState(false);

  const limpiarMensaje = () => {
    setMensaje("");
    setTipoMensaje("");
  };

  const handleFiesta = (respuesta) => {
    setAsisteFiesta(respuesta);
    limpiarMensaje();

    if (respuesta === "no") {
      setCantidadFiesta(1);
      setMenu("");
      setMenuOtro("");
    }
  };

  const handleViernes = (respuesta) => {
    setAsistenciaViernes(respuesta);
    limpiarMensaje();

    if (respuesta !== "brindis") {
      setCantidadBrindis(1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nombreLimpio = nombre.trim();
    const menuOtroLimpio = menuOtro.trim();

    if (!nombreLimpio) {
      setMensaje(
        "Completá tu nombre y apellido.",
      );
      setTipoMensaje("error");
      return;
    }

    if (
      mostrarPreguntaViernes &&
      !asistenciaViernes
    ) {
      setMensaje(
        "Seleccioná una opción para el encuentro del viernes.",
      );
      setTipoMensaje("error");
      return;
    }

    if (!asisteTemplo) {
      setMensaje(
        "Indicá si vas a asistir al templo el sábado.",
      );
      setTipoMensaje("error");
      return;
    }

    if (!asisteFiesta) {
      setMensaje(
        "Indicá si vas a asistir a la fiesta.",
      );
      setTipoMensaje("error");
      return;
    }

    if (
      mostrarPreguntaViernes &&
      asistenciaViernes === "brindis" &&
      (!Number.isInteger(Number(cantidadBrindis)) ||
        Number(cantidadBrindis) < 1 ||
        Number(cantidadBrindis) > 10)
    ) {
      setMensaje(
        "Seleccioná una cantidad válida para el brindis.",
      );
      setTipoMensaje("error");
      return;
    }

    if (
      asisteFiesta === "si" &&
      (!Number.isInteger(Number(cantidadFiesta)) ||
        Number(cantidadFiesta) < 1 ||
        Number(cantidadFiesta) > 10)
    ) {
      setMensaje(
        "Seleccioná una cantidad válida para la fiesta.",
      );
      setTipoMensaje("error");
      return;
    }

    if (asisteFiesta === "si" && !menu) {
      setMensaje(
        "Seleccioná una opción de menú.",
      );
      setTipoMensaje("error");
      return;
    }

    if (
      asisteFiesta === "si" &&
      menu === "otro" &&
      !menuOtroLimpio
    ) {
      setMensaje(
        "Especificá qué menú necesitás.",
      );
      setTipoMensaje("error");
      return;
    }

    const restriccionAlimentaria =
      asisteFiesta === "no"
        ? null
        : menu === "otro"
          ? menuOtroLimpio
          : menu;

    setEnviando(true);
    limpiarMensaje();

    const { error } = await supabase
      .from("confirmaciones")
      .insert([
        {
          evento: EVENTO_SLUG,
          tipo_invitacion: TIPO_INVITACION,
          nombre_apellido: nombreLimpio,

          cantidad_invitados:
            asisteFiesta === "si"
              ? Number(cantidadFiesta)
              : 0,

          cantidad_brindis:
            mostrarPreguntaViernes &&
            asistenciaViernes === "brindis"
              ? Number(cantidadBrindis)
              : null,

          asistencia_viernes:
            mostrarPreguntaViernes
              ? asistenciaViernes
              : null,

          asiste_templo_sabado:
            asisteTemplo === "si",

          // La columna existente "asiste"
          // representa la asistencia a la fiesta.
          asiste:
            asisteFiesta === "si",

          restriccion_alimentaria:
            restriccionAlimentaria,
        },
      ]);

    if (error) {
      console.error(
        "Error al guardar la confirmación:",
        error,
      );

      setMensaje(
        "No pudimos registrar tu respuesta. Intentá nuevamente.",
      );
      setTipoMensaje("error");
      setEnviando(false);
      return;
    }

    setMensaje(
      "¡Gracias! Tu respuesta fue registrada.",
    );
    setTipoMensaje("success");

    setNombre("");
    setAsistenciaViernes("");
    setAsisteTemplo("");
    setAsisteFiesta("");
    setCantidadBrindis(1);
    setCantidadFiesta(1);
    setMenu("");
    setMenuOtro("");
    setEnviando(false);
  };

  return (
    <section
  className="confirmation"
  aria-labelledby="confirmation-title"
  style={{
    "--confirmation-image": `url(${fondoConfirmacion})`,
  }}
>
      <div className="confirmation__content">
        <h2
          className="confirmation__title"
          id="confirmation-title"
        >
          <img
            className="confirmation__title-image"
            src={tituloConfirmacion}
            alt="Confirmá asistencia"
          />
        </h2>

        <p className="confirmation__intro">
          Por favor, completá un formulario por
          familia o grupo invitado
        </p>

        <form
          className="confirmation__form"
          onSubmit={handleSubmit}
          aria-busy={enviando}
        >
          <label className="confirmation__field">
            <span>Nombre y apellido</span>

            <input
              type="text"
              value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
                limpiarMensaje();
              }}
              placeholder="Escribí tu nombre completo"
              autoComplete="name"
              disabled={enviando}
              required
            />
          </label>

          {mostrarPreguntaViernes && (
            <fieldset
              className="confirmation__group"
              disabled={enviando}
            >
              <legend className="confirmation__question">
                ¿Podés venir el viernes al Kabalat
                Shabat?
              </legend>

              <div className="confirmation__options">
                <label className="confirmation__option">
                  <input
                    type="radio"
                    name="asistenciaViernes"
                    value="brindis"
                    checked={
                      asistenciaViernes === "brindis"
                    }
                    onChange={() =>
                      handleViernes("brindis")
                    }
                    required
                  />

                  <span>
                    Sí, y me quedo al brindis
                  </span>
                </label>

                <label className="confirmation__option">
                  <input
                    type="radio"
                    name="asistenciaViernes"
                    value="sin_brindis"
                    checked={
                      asistenciaViernes ===
                      "sin_brindis"
                    }
                    onChange={() =>
                      handleViernes("sin_brindis")
                    }
                  />

                  <span>
                    Sí, pero no me quedo al brindis
                  </span>
                </label>

                <label className="confirmation__option">
                  <input
                    type="radio"
                    name="asistenciaViernes"
                    value="no"
                    checked={
                      asistenciaViernes === "no"
                    }
                    onChange={() =>
                      handleViernes("no")
                    }
                  />

                  <span>No puedo ir</span>
                </label>
              </div>
            </fieldset>
          )}

          {mostrarPreguntaViernes &&
            asistenciaViernes === "brindis" && (
              <label className="confirmation__field">
                <span>
                  Cantidad de personas para el brindis
                </span>

                <select
                  className="confirmation__select"
                  value={cantidadBrindis}
                  onChange={(event) => {
                    setCantidadBrindis(
                      Number(event.target.value),
                    );
                    limpiarMensaje();
                  }}
                  disabled={enviando}
                  required
                >
                  {opcionesCantidad.map((numero) => (
                    <option value={numero} key={numero}>
                      {numero}
                    </option>
                  ))}
                </select>
              </label>
            )}

          <fieldset
            className="confirmation__group"
            disabled={enviando}
          >
            <legend className="confirmation__question">
              ¿Podés venir el sábado al templo?
            </legend>

            <div className="confirmation__options confirmation__options--two">
              <label className="confirmation__option">
                <input
                  type="radio"
                  name="asisteTemplo"
                  value="si"
                  checked={asisteTemplo === "si"}
                  onChange={() => {
                    setAsisteTemplo("si");
                    limpiarMensaje();
                  }}
                  required
                />

                <span>Sí, voy a asistir</span>
              </label>

              <label className="confirmation__option">
                <input
                  type="radio"
                  name="asisteTemplo"
                  value="no"
                  checked={asisteTemplo === "no"}
                  onChange={() => {
                    setAsisteTemplo("no");
                    limpiarMensaje();
                  }}
                />

                <span>No puedo ir</span>
              </label>
            </div>
          </fieldset>

          <fieldset
            className="confirmation__group"
            disabled={enviando}
          >
            <legend className="confirmation__question">
              ¿Vas a asistir a la fiesta?
            </legend>

            <div className="confirmation__options confirmation__options--two">
              <label className="confirmation__option">
                <input
                  type="radio"
                  name="asisteFiesta"
                  value="si"
                  checked={asisteFiesta === "si"}
                  onChange={() =>
                    handleFiesta("si")
                  }
                  required
                />

                <span>
                  Sí, ¡no me la pierdo!
                </span>
              </label>

              <label className="confirmation__option">
                <input
                  type="radio"
                  name="asisteFiesta"
                  value="no"
                  checked={asisteFiesta === "no"}
                  onChange={() =>
                    handleFiesta("no")
                  }
                />

                <span>No puedo asistir</span>
              </label>
            </div>
          </fieldset>

          {asisteFiesta === "si" && (
            <label className="confirmation__field">
              <span>
                Cantidad de personas para la fiesta
              </span>

              <select
                className="confirmation__select"
                value={cantidadFiesta}
                onChange={(event) => {
                  setCantidadFiesta(
                    Number(event.target.value),
                  );
                  limpiarMensaje();
                }}
                disabled={enviando}
                required
              >
                {opcionesCantidad.map((numero) => (
                  <option value={numero} key={numero}>
                    {numero}
                  </option>
                ))}
              </select>
            </label>
          )}

          {asisteFiesta === "si" && (
            <fieldset
              className="confirmation__group"
              disabled={enviando}
            >
              <legend className="confirmation__question">
                ¿Necesitás algún menú especial?
              </legend>

              <div className="confirmation__options confirmation__options--menu">
                <label className="confirmation__option">
                  <input
                    type="radio"
                    name="menu"
                    value="Ninguno"
                    checked={menu === "Ninguno"}
                    onChange={() => {
                      setMenu("Ninguno");
                      setMenuOtro("");
                      limpiarMensaje();
                    }}
                    required
                  />

                  <span>Ninguno</span>
                </label>

                <label className="confirmation__option">
                  <input
                    type="radio"
                    name="menu"
                    value="Vegetariano"
                    checked={
                      menu === "Vegetariano"
                    }
                    onChange={() => {
                      setMenu("Vegetariano");
                      setMenuOtro("");
                      limpiarMensaje();
                    }}
                  />

                  <span>Vegetariano</span>
                </label>

                <label className="confirmation__option">
                  <input
                    type="radio"
                    name="menu"
                    value="Sin TACC"
                    checked={menu === "Sin TACC"}
                    onChange={() => {
                      setMenu("Sin TACC");
                      setMenuOtro("");
                      limpiarMensaje();
                    }}
                  />

                  <span>Sin TACC</span>
                </label>

                <label className="confirmation__option">
                  <input
                    type="radio"
                    name="menu"
                    value="otro"
                    checked={menu === "otro"}
                    onChange={() => {
                      setMenu("otro");
                      limpiarMensaje();
                    }}
                  />

                  <span>Otro</span>
                </label>
              </div>
            </fieldset>
          )}

          {asisteFiesta === "si" &&
            menu === "otro" && (
              <label className="confirmation__field">
                <span>
                  Especificá el menú que necesitás
                </span>

                <input
                  type="text"
                  value={menuOtro}
                  onChange={(event) => {
                    setMenuOtro(event.target.value);
                    limpiarMensaje();
                  }}
                  placeholder="Escribí tu requerimiento"
                  disabled={enviando}
                  required
                />
              </label>
            )}

          <button
            className="confirmation__button"
            type="submit"
            disabled={enviando}
          >
            {enviando
              ? "Enviando..."
              : "Enviar confirmación"}
          </button>

          {mensaje && (
            <p
              className={`confirmation__message confirmation__message--${tipoMensaje}`}
              role={
                tipoMensaje === "error"
                  ? "alert"
                  : "status"
              }
              aria-live="polite"
            >
              {mensaje}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Confirmacion;