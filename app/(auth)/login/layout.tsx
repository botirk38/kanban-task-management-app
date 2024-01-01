import Logo from "@/app/components/auth/Logo"
export default function LoginLayout({
  children, }: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen min-w-screen flex">

	<div className="h-full w-full flex flex-col p-10 gap-10">
		<nav className="flex justify-start items-start w-3/4 ">
			<Logo/>	
		</nav>
      		{children}
      	</div>

	<picture className="hidden md:block flex justify-end items-end w-full ">
		<img alt="" src="/assets/auth-banner.png" className="min-w-full min-h-screen object-cover"/>
	</picture>
    </section>
  )
}


