import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));

  if (!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, setCitas] = useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el stage cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  // Función que tome las citas actuales y agrege la nueva
  const crearCita = (cita) => {
    setCitas([...citas, cita]);
  };

  //Funcion que elelimina cita por ID
  const deleteCitas = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    setCitas(nuevasCitas);
  };

  // Mensaje condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <>
      <h1 data-testid="nombre-app">Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            {" "}
            <h2 data-testid="titulo-dinamico">{titulo}</h2>{" "}
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} deleteCitas={deleteCitas} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
