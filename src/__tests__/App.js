import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("<App/> La aplicación funciona bien la primera vez", () => {
  //   const wrapper = render(<App />);
  //   wrapper.debug();

  render(<App />);
  expect(screen.getByText("Administrador de Pacientes")).toBeInTheDocument();
  expect(screen.getByTestId("nombre-app").textContent).toBe(
    "Administrador de Pacientes"
  );
  expect(screen.getByTestId("nombre-app").tagName).toBe("H1");

  expect(screen.getByText("Crear Cita")).toBeInTheDocument();
  expect(screen.getByText("No hay citas")).toBeInTheDocument();
});

test("<App/> Creamos primera cita y verificar el heading", () => {
  render(<App />);
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

  // Revisar por el titulo dinámico
  expect(screen.getByTestId("titulo-dinamico").textContent).toBe(
    "Administra tus citas"
  );
  expect(screen.getByTestId("titulo-dinamico").textContent).not.toBe(
    "No hay citas"
  );
});
test("<App/> Verificar las citas en el DOM", async () => {
  render(<App />);
  const citas = await screen.findAllByTestId("cita");
  // Snapshot crea un archivo apra verificar su contenido
  //expect(citas).toMatchSnapshot();
  expect(screen.getByTestId("btn-eliminar").tagName).toBe("BUTTON");
  expect(screen.getByTestId("btn-eliminar")).toBeInTheDocument();

  // Verificar alguna Cita
  expect(screen.getByText("Hook")).toBeInTheDocument();
});
test("<App/> Eliminar la cita", async () => {
  render(<App />);

  const btnEliminar = screen.getByTestId("btn-eliminar");
  expect(btnEliminar.tagName).toBe("BUTTON");
  expect(btnEliminar).toBeInTheDocument();

  //Simular el
  userEvent.click(btnEliminar);

  // El boton ya no debe estar
  expect(btnEliminar).not.toBeInTheDocument();

  // La cita ya no debe estar
  expect(screen.queryByText("Hook")).not.toBeInTheDocument();
  expect(screen.queryByTestId("cita")).not.toBeInTheDocument();
});
