import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Import necessary functions and types from Redux Toolkit

// Define the shape of the initial state for the global slice
export interface InitialStateTypes {
  isSidebarCollapsed: boolean; // Whether the sidebar is collapsed
  isDarkMode: boolean; // Whether the dark mode is active
}

// Set the initial values for the global state properties
const initialState: InitialStateTypes = {
  isSidebarCollapsed: false, // Sidebar is not collapsed by default
  isDarkMode: false, // Dark mode is disabled by default
};

// Create a Redux slice named 'global' to handle global UI state
export const globalSlice = createSlice({
  name: "global", // Name of the slice
  initialState, // Initial state value
  reducers: {
    // Reducer to update the sidebar collapsed state
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload; // Update state based on action payload
    },
    // Reducer to toggle dark mode
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload; // Update state based on action payload
    },
  },
});

// Export actions generated by createSlice for dispatching
export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions;

// Export the reducer to be included in the store configuration
export default globalSlice.reducer;
