import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Highway Delite - Book Your Adventure",
  description: "Discover and book amazing travel experiences across India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
