import { Metadata } from "next";
import './globals.css'
import { Inter } from 'next/font/google'
import ThemeProvider from "./components/context/FormContext";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanban Task Management App',
  description: 'A task management app built with Next.js and Tailwind CSS',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
  <ThemeProvider>
      <html lang="en">
        <body className={`${inter.className}  w-full min-h-screen`}>{children}</body>
      </html>
  </ThemeProvider>
  );
}
