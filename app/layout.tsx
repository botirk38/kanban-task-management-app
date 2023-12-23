import { Metadata } from "next";
import './globals.css'

export const metadata: Metadata = {
  title: "Kanban Task Management App",
  description: "A task management app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body>{children}</body>
      </html>
  );
}
