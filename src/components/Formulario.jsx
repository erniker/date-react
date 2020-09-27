import React, { useState } from "react";
import uuid from "uuid/dist/v4";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  // Crear Stage de Citas
  const [cita, setCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  // Crear Stage de errores
  const [error, setError] = useState(false);

  // Funcion que se ejecuta cada vez que el usuario escribe en un input
  const handleStage = (e) => {
    setCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  // Extraer los valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Submit Form
  const submitCita = (e) => {
    e.preventDefault();

    // Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      setError(true);
      return;
    }

    // Borrar mensaje de error si anteriormente habia un error
    setError(false);

    // Asignar un ID
    cita.id = uuid();

    // Crear la Cita
    crearCita(cita);

    //Reiniciar el form
    setCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <>
      <h2>Crear Cita</h2>¨
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={handleStage}
          value={mascota}
        />
        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la mascota"
          onChange={handleStage}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={handleStage}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={handleStage}
          value={hora}
        />

        <label>Síntomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={handleStage}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default Formulario;
