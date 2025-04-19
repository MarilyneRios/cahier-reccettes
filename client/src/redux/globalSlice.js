import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalLoading: false,
  globalError: null,
  isModalOpen: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    setGlobalError: (state, action) => {
      state.globalError = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setGlobalLoading, setGlobalError, setIsModalOpen } = globalSlice.actions;
export default globalSlice.reducer;
