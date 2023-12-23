import Logo from "@/app/components/auth/Logo"

export default function LoginLayout({
  children, }: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen min-w-screen flex">

	<div className="h-full w-full flex flex-col p-10 gap-10">
		<nav className="flex justify-start items-start w-full ">
			<Logo/>	
		</nav>
      		{children}
      	</div>
    </section>
  )
}


