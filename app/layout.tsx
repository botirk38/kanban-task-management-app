import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ThemeProvider from "./components/context/FormContext";
import Sidebar from "../app/components/Sidebar";
import boardsData from "./data.json";
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
  children: React.ReactNode
}) {

  


  return (
    <html lang="en">
      <ThemeProvider>
        <body className={inter.className}>
        <BoardProvider>
          <BoardsProvider>
            <Sidebar/>
            {children}
          </BoardsProvider>
        </BoardProvider>

        </body>
      </ThemeProvider>
    </html>
  )
}
