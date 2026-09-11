import { useEffect, useState } from "react";
import florCuentaRegresiva from "../../assets/flor-cuenta-regresiva.png";
import tituloCuantoFalta from "../../assets/texto-cuantofalta.png";
import "./Cuentaregresiva.css";

const EVENT_DATE = new Date("2026-10-10T21:00:00-03:00").getTime();

function getTimeLeft() {
  const difference = Math.max(EVENT_DATE - Date.now(), 0);

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

function CuentaRegresiva() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { label: "DÍAS", value: timeLeft.days },
    { label: "HORAS", value: timeLeft.hours },
    { label: "MINUTOS", value: timeLeft.minutes },
    { label: "SEGUNDOS", value: timeLeft.seconds },
  ];

  return (
    <section className="countdown" aria-labelledby="countdown-title">
      <div className="countdown__card">
       <h2 className="countdown__title" id="countdown-title">
  <img
    className="countdown__title-image"
    src={tituloCuantoFalta}
    alt="¿Cuánto falta?"
  />
</h2>

        <div className="countdown__units" aria-hidden="true">
          {units.map((unit) => (
            <div className="countdown__unit" key={unit.label}>
              <span className="countdown__number">
                {formatNumber(unit.value)}
              </span>
              <span className="countdown__label">{unit.label}</span>
            </div>
          ))}
        </div>

        <p className="countdown__accessible" aria-live="polite">
          Faltan {timeLeft.days} días, {timeLeft.hours} horas, {timeLeft.minutes}
          minutos y {timeLeft.seconds} segundos.
        </p>

        <img
          className="countdown__flower"
          src={florCuentaRegresiva}
          alt=""
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export default CuentaRegresiva;
