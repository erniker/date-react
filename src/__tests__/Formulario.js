import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
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

  // Revisar por la alerta
  const alerta = screen.getByTestId("alerta");
  expect(alerta).toBeInTheDocument();
  expect(alerta.textContent).toBe("Todos los campos son obligatorios");
  expect(alerta.tagName).toBe("P");
  expect(alerta.tagName).not.toBe("BUTTON");
});

test("<Formulario/> Validacion de formulario relleno", () => {
  render(<Formulario crearCita={crearCita} />);

  // fireEvent.change(screen.getByTestId("mascota"), {
  //   target: { value: "Hook" },
  // });
  // fireEvent.change(screen.getByTestId("propietario"), {
  //   target: { value: "JP" },
  // });

  userEvent.type(screen.getByTestId("mascota"), "Hook");
  userEvent.type(screen.getByTestId("propietario"), "JP");
  userEvent.type(screen.getByTestId("fecha"), "2021-09-10");
  userEvent.type(screen.getByTestId("hora"), "10:30");
  userEvent.type(screen.getByTestId("sintomas"), "Solo duerme");

  // Click en el boton de submit
  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  // Revisar por la alerta
  const alerta = screen.queryByTestId("alerta");
  expect(alerta).not.toBeInTheDocument();

  // Crear cita y comprobar que la funcion se haya llamado
  expect(crearCita).toHaveBeenCalled();
  expect(crearCita).toHaveBeenCalledTimes(1);
});

// test("<Formulario/> Validación del formulario", () => {});
