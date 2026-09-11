import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase.js";

import "./Panel.css";

const EVENTO_SLUG = "mi-bat-sofi";

function PanelDemo() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmaciones, setConfirmaciones] =
    useState([]);

  const [cargandoSesion, setCargandoSesion] =
    useState(true);

  const [cargandoDatos, setCargandoDatos] =
    useState(false);

  const [iniciandoSesion, setIniciandoSesion] =
    useState(false);

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const obtenerSesion = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      setSession(currentSession);
      setCargandoSesion(false);
    };

    obtenerSesion();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setCargandoSesion(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setConfirmaciones([]);
      return;
    }

    const cargarConfirmaciones = async () => {
      setCargandoDatos(true);
      setMensaje("");

    const { data, error } = await supabase
  .from("confirmaciones")
  .select(
    `
      id,
      nombre_apellido,
      tipo_invitacion,
      asistencia_viernes,
      cantidad_brindis,
      asiste_templo_sabado,
      asiste,
      cantidad_invitados,
      restriccion_alimentaria,
      created_at
    `,
  )
  .eq("evento", EVENTO_SLUG)
  .order("created_at", {
    ascending: false,
  });




      if (error) {
        console.error(
          "Error al cargar confirmaciones:",
          error
        );

        setMensaje(
          "No pudimos cargar las confirmaciones."
        );

        setConfirmaciones([]);
        setCargandoDatos(false);

        return;
      }

      setConfirmaciones(data ?? []);
      setCargandoDatos(false);
    };

    cargarConfirmaciones();
  }, [session]);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setMensaje(
        "Ingresá el correo y la contraseña."
      );

      return;
    }

    setIniciandoSesion(true);
    setMensaje("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (error) {
      console.error(
        "Error al iniciar sesión:",
        error
      );

      setMensaje(
        "El correo o la contraseña no son correctos."
      );

      setIniciandoSesion(false);

      return;
    }

    setPassword("");
    setIniciandoSesion(false);
  };

  const handleLogout = async () => {
    setMensaje("");

    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        "Error al cerrar sesión:",
        error
      );

      setMensaje(
        "No pudimos cerrar la sesión."
      );
    }
  };








 const descargarLista = () => {
  if (confirmaciones.length === 0) {
    setMensaje(
      "Todavía no hay confirmaciones para descargar.",
    );
    return;
  }

  const escaparCelda = (valor) => {
    const texto = String(valor ?? "");

    return `"${texto.replaceAll('"', '""')}"`;
  };

  const traducirViernes = (respuesta) => {
    if (respuesta === "brindis") {
      return "Sí, asiste y se queda al brindis";
    }

    if (respuesta === "sin_brindis") {
      return "Sí, asiste sin brindis";
    }

    if (respuesta === "no") {
      return "No asiste";
    }

    return "No corresponde";
  };

  const encabezados = [
    "Nombre y apellido",
    "Tipo de invitación",
    "Asistencia viernes",
    "Cantidad brindis",
    "Asiste al templo",
    "Asiste a la fiesta",
    "Cantidad fiesta",
    "Menú especial",
    "Fecha de confirmación",
  ];

  const filas = confirmaciones.map((persona) => [
    persona.nombre_apellido,
    persona.tipo_invitacion === "completa"
      ? "Completa"
      : "Fiesta",
    traducirViernes(persona.asistencia_viernes),
    persona.cantidad_brindis ?? "",
    persona.asiste_templo_sabado === true
      ? "Sí"
      : "No",
    persona.asiste === true ? "Sí" : "No",
    persona.asiste === true
      ? persona.cantidad_invitados
      : 0,
    persona.restriccion_alimentaria ?? "",
    persona.created_at
      ? new Date(persona.created_at).toLocaleString(
          "es-AR",
        )
      : "",
  ]);

  const contenido = [encabezados, ...filas]
    .map((fila) =>
      fila.map(escaparCelda).join(","),
    )
    .join("\n");

  const archivo = new Blob(
    [`\uFEFF${contenido}`],
    {
      type: "text/csv;charset=utf-8;",
    },
  );

  const url = URL.createObjectURL(archivo);
  const enlace = document.createElement("a");

  enlace.href = url;
  enlace.download =
    "confirmaciones-mi-bat-sofi.csv";

  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();

  URL.revokeObjectURL(url);
};
   







 const totalRespuestas = confirmaciones.length;

const personasFiesta = confirmaciones.reduce(
  (total, persona) => {
    if (persona.asiste !== true) {
      return total;
    }

    return (
      total +
      Number(persona.cantidad_invitados || 0)
    );
  },
  0,
);

const personasBrindis = confirmaciones.reduce(
  (total, persona) =>
    total +
    Number(persona.cantidad_brindis || 0),
  0,
);

const confirmacionesTemplo =
  confirmaciones.filter(
    (persona) =>
      persona.asiste_templo_sabado === true,
  ).length;

const respuestasNoFiesta =
  confirmaciones.filter(
    (persona) => persona.asiste === false,
  ).length;






  const invitationUrl =
    `${window.location.origin}${window.location.pathname}`;

  if (cargandoSesion) {
    return (
      <main className="panel panel--centered">
        <p className="panel__loading">
          Cargando panel...
        </p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="panel panel--centered">
        <section className="panel__login">
          <p className="panel__eyebrow">
            Panel de confirmaciones
          </p>

          <h1 className="panel__title">
            Mi Bat Sofi
          </h1>

          <p className="panel__login-intro">
            Ingresá con los datos proporcionados
            para consultar las respuestas.
          </p>

          <form
            className="panel__login-form"
            onSubmit={handleLogin}
          >
            <label className="panel__field">
              <span>Correo electrónico</span>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                disabled={iniciandoSesion}
                required
              />
            </label>

            <label className="panel__field">
              <span>Contraseña</span>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                disabled={iniciandoSesion}
                required
              />
            </label>

            <button
              className="panel__login-button"
              type="submit"
              disabled={iniciandoSesion}
            >
              {iniciandoSesion
                ? "Ingresando..."
                : "Ingresar"}
            </button>

            {mensaje && (
              <p
                className="panel__message panel__message--error"
                role="alert"
              >
                {mensaje}
              </p>
            )}
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="panel">
      <div className="panel__container">
        <p className="panel__eyebrow">
          Panel de confirmaciones
        </p>

        <h1 className="panel__title">
          Mi Bat Sofi
        </h1>

        <div className="panel__actions">
          <button
            type="button"
            onClick={descargarLista}
          >
            Descargar lista
          </button>

          <a href={invitationUrl}>
            Ver invitación
          </a>

          <button
            type="button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>

        {mensaje && (
          <p
            className="panel__message panel__message--error"
            role="alert"
          >
            {mensaje}
          </p>
        )}




<section className="panel__stats">
  <article>
    <span>Respuestas recibidas</span>
    <strong>{totalRespuestas}</strong>
  </article>

  <article>
    <span>Personas al brindis</span>
    <strong>{personasBrindis}</strong>
  </article>

  <article>
    <span>Personas a la fiesta</span>
    <strong>{personasFiesta}</strong>
  </article>

  <article>
    <span>Confirmaciones al templo</span>
    <strong>{confirmacionesTemplo}</strong>
  </article>

  <article>
    <span>No asisten a la fiesta</span>
    <strong>{respuestasNoFiesta}</strong>
  </article>
</section>
         







        <div className="panel__table-container">
          {cargandoDatos ? (
            <p className="panel__loading">
              Cargando confirmaciones...
            </p>
          ) : confirmaciones.length === 0 ? (
            <p className="panel__empty">
              Todavía no hay confirmaciones.
            </p>
          ) : (


           <table className="panel__table">
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Invitación</th>
      <th>Viernes</th>
      <th>Brindis</th>
      <th>Templo</th>
      <th>Fiesta</th>
      <th>Cantidad</th>
      <th>Menú</th>
    </tr>
  </thead>

  <tbody>
    {confirmaciones.map((persona) => (
      <tr key={persona.id}>
        <td>{persona.nombre_apellido}</td>

        <td>
          {persona.tipo_invitacion === "completa"
            ? "Completa"
            : "Fiesta"}
        </td>

        <td>
          {persona.asistencia_viernes === "brindis"
            ? "Sí + brindis"
            : persona.asistencia_viernes ===
                "sin_brindis"
              ? "Sí, sin brindis"
              : persona.asistencia_viernes === "no"
                ? "No"
                : "—"}
        </td>

        <td>
          {persona.cantidad_brindis ?? "—"}
        </td>

        <td>
          {persona.asiste_templo_sabado === true
            ? "Sí"
            : "No"}
        </td>

        <td>
          {persona.asiste === true ? "Sí" : "No"}
        </td>

        <td>
          {persona.asiste === true
            ? persona.cantidad_invitados
            : "—"}
        </td>

        <td>
          {persona.restriccion_alimentaria ??
            "—"}
        </td>
      </tr>
    ))}
  </tbody>
</table>
                  






          )}
        </div>
      </div>
    </main>
  );
}

export default PanelDemo;