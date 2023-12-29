import '../globals.css'
import Sidebar from '../components/Sidebar';





export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  


  return (
        <section className={`lg:grid lg:grid-cols-3 lg:justify-items-center lg:place-items-start w-full min-h-screen`}>
        
            <Sidebar/>
            {children}
         

        </section>
  )
}
