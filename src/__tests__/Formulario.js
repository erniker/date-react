import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Formulario from "../components/Formulario";

const crearCita = jest.fn();

test("<Formulario/> Cargar el formulario y revisar que todo sea correcto", () => {
  //   const wrapper = render(<Formulario />);
  //   wrapper.debug();
  //const { getByText } = render(<Formulario />);
  //expect(getByText("Crear Cita")).toBeInTheDocument();

  render(<Formulario crearCita={crearCita} />);
  expect(screen.getByText("Crear Cita")).toBeInTheDocument();

  // Header
  expect(screen.getByTestId("titulo").tagName).toBe("H2");
  expect(screen.getByTestId("titulo").tagName).not.toBe("H1");
  expect(screen.getByTestId("titulo").textContent).toBe("Crear Cita");

  // Boton de submit
  expect(screen.getByTestId("btn-submit").tagName).toBe("BUTTON");
  expect(screen.getByTestId("btn-submit").textContent).toBe("Agregar Cita");
});

test("<Formulario/> Validacion de formulario", () => {
  render(<Formulario crearCita={crearCita} />);

  // Click en el boton de submit
  const btnSubmit = screen.getByTestId("btn-submit");
  fireEvent.click(btnSubmit);
  expect(screen.getByTestId("alerta").textContent).toBe(
    "Todos los campos son obligatorios"
  );
  // Revisar por la alerta
});

// test("<Formulario/> Validación del formulario", () => {});
