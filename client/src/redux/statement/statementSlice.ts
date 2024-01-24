import { createSlice } from "@reduxjs/toolkit";
import { StatementState } from "./statement.types";

const initialState: StatementState = {
  statements: [],
  error: null,
  loading: false,
};

const statementSlice = createSlice({
  name: 'statement',
  initialState,
  reducers: {
    fetchStatementsStart: (state) => {
      state.loading = true;
    },
    fetchStatementsSuccess: (state, action) => {
      state.statements = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchStatementsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});

export const {
  fetchStatementsStart,
  fetchStatementsSuccess,
  fetchStatementsFailure,
} = statementSlice.actions;

export default statementSlice.reducer;
