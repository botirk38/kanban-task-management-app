import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ThemeProvider from "../app/components/FormContext";
import Sidebar from "../app/components/Sidebar";
import boardsData from "./data.json";


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

  console.log("Layout Data:", boardsData.boards)
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={inter.className}>
          <Sidebar boards={boardsData.boards} />

          {children}

        </body>
      </ThemeProvider>
    </html>
  )
}
