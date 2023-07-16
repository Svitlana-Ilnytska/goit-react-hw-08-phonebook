import { createReducer } from "@reduxjs/toolkit";
import filterContact from "./contacts-actions";


const filter = createReducer("", {
  [filterContact]: (_, { payload }) => payload,
});


export default filter;