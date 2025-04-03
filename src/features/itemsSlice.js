import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

const initialState = [
  {
    id: uuid(),
    cantidad: "3",
    detalle: "Filtros",
    precio_unitario: "3000",
    total: "9000"
  }
];

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    editItem: (state, action) => {
      const { id, cantidad, detalle, precio_unitario, total } = action.payload;
      const foundTask = state.find((item) => item.id === id);
      if (foundTask) {
        foundTask.cantidad = cantidad;
        foundTask.detalle = detalle;
        foundTask.precio_unitario = precio_unitario;
        foundTask.total = total;
      }
    },
    deleteItem: (state, action) => {
      const foundTask = state.find((item) => item.id === action.payload);
      if (foundTask) {
        state.splice(state.indexOf(foundTask), 1);
      }
    },
  },
});

export const { addItem, editItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;