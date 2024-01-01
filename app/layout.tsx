import { Metadata } from "next";
import './globals.css'
import { Inter } from 'next/font/google'
import ThemeProvider from "./components/context/FormContext";
import { BoardProvider } from './components/context/BoardContext';
import { BoardsProvider } from './components/context/BoardsContext';

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
      <BoardProvider>
          <BoardsProvider>
            <html lang="en">
              <body className={`${inter.className} overflow-y-hidden w-full min-h-screen`}>{children}</body>
            </html>

           </BoardsProvider>
      </BoardProvider>
  </ThemeProvider>
  );
}
