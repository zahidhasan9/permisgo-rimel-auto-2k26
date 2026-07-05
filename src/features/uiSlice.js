import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
  activeMenu: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { toggleSidebar, closeSidebar, setActiveMenu } = uiSlice.actions;
export default uiSlice.reducer;
