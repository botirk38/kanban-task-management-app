"use client";
import Image from "next/image"
import Hero from "./components/landing/Hero"


const Page = () => {
    return (
        <main className="flex flex-col-reverse gap-20 justify-end md:flex-col md:justify-start md:items-center py-20 px-10 min-h-screen ">
            <Hero />
            <Image
                src="/assets/landing-image.png"
                width={0}
                height={0}
                sizes="100vw"
                alt= "Image representing kanban methodology"
                style={{ width: '100%', height: '100%', maxWidth: "1440px" }} // optional
            />
        </main>

    )
}

export default Page
