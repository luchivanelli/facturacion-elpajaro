import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fecha: "",
  cliente: "",
  direccion: "",
  vehiculo: "",
  patente: "",
  kilometraje: "",
  observaciones: "",
  entrega: "",
};

const convertDate = (fecha) => {
  if (fecha) {
    const [anio, mes, dia] = fecha.split("-");
    return `${dia}-${mes}-${anio}`;
  }
  return "";
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    guardarInfo: (state, action) => {
      const { fecha, cliente, direccion, vehiculo, patente, kilometraje } = action.payload;
      state.fecha = convertDate(fecha);
      state.cliente = cliente;
      state.direccion = direccion;
      state.vehiculo = vehiculo;
      state.patente = patente;
      state.kilometraje = kilometraje;
    },
    guardarInfoObservaciones: (state, action) => {
      state.observaciones = action.payload;
    },
    guardarEntrega: (state, action) => {
      state.entrega = action.payload;
    },
  },
});

export const { guardarInfo, guardarInfoObservaciones, guardarEntrega } = infoSlice.actions;
export default infoSlice.reducer;
