import '../globals.css'
import Sidebar from '../components/Sidebar';
import { BoardProvider } from '../components/context/BoardContext';
import { BoardsProvider } from '../components/context/BoardsContext';




export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  


  return (
        <section className={`lg:grid lg:grid-cols-3 lg:justify-items-center  lg:place-items-start w-full min-h-screen`}>
        <BoardProvider>
          <BoardsProvider>
            <Sidebar/>
            {children}
          </BoardsProvider>
        </BoardProvider>

        </section>
  )
}
