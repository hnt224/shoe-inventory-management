"use client"; // This file uses client-side rendering in a Next.js app

import React, { useEffect } from "react";
import Navbar from "@/app/(components)/Navbar"; // Import the Navbar component
import Sidebar from "@/app/(components)/Sidebar"; // Import the Sidebar component
import StoreProvider, { useAppSelector } from "./redux"; // Import StoreProvider and useAppSelector from Redux store

// DashboardLayout component to structure the layout of the dashboard
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Fetch the state of the sidebar collapse and dark mode from the global store using Redux
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // useEffect to apply dark or light mode class to the HTML element based on the store state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark"); // Add dark class to the document if dark mode is enabled
    } else {
      document.documentElement.classList.add("light"); // Add light class to the document if dark mode is not enabled
    }
  }, [isDarkMode]); // Effect should run when isDarkMode changes

  return (
    // Main container with dynamic classNames for dark/light mode and flex layout
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`} // Apply dark or light mode to the entire page
    >
      {/* Sidebar component for navigation */}
      <Sidebar />

      {/* Main content area */}
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`} // Apply padding depending on whether the sidebar is collapsed
      >
        {/* Navbar component for the top navigation */}
        <Navbar />

        {/* Render children components (content of the dashboard page) */}
        {children}
      </main>
    </div>
  );
};

// DashboardWrapper component to wrap the DashboardLayout with StoreProvider for state management
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    // Wrap DashboardLayout with StoreProvider to manage global state
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper; // Export DashboardWrapper component for use in other parts of the app
