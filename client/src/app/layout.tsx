import type { Metadata } from "next"; // Import Metadata type for defining the page's metadata (e.g., title, description)
import { Inter } from "next/font/google"; // Import the Inter font from Google Fonts for use in the app
import "./globals.css"; // Import global CSS styles
import DashboardWrapper from "./dashboardWrapper"; // Import the DashboardWrapper component for page layout

// Initialize the Inter font with the Latin subset
const inter = Inter({ subsets: ["latin"] });

// Metadata for the application, including title and description for SEO and page info
export const metadata: Metadata = {
  title: "Stepify Shoe Dashboard", // Title of the page
  description: "Dashboard for basketball shoe needs.", // Description of the page for SEO purposes
};

// RootLayout component that wraps the entire application layout and includes global styling
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Type for children prop, which is the content passed into this layout
}>) {
  return (
    // HTML structure for the root layout
    <html lang="en">
      {" "}
      {/* Set the language attribute to "en" for English */}
      <body className={inter.className}>
        {" "}
        {/* Apply the Inter font to the body element */}
        {/* Wrap the content (children) inside DashboardWrapper for layout */}
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
