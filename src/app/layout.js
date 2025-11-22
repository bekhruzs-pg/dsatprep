import "./globals.css";

export const metadata = {
  title: "DSAT Prep Platform - Target 1600",
  description: "Master the Digital SAT with structured roadmaps, practice tests, and comprehensive study materials for Math and English.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
