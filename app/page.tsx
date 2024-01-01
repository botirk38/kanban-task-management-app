"use client";
import Image from "next/image"
import Hero from "./components/landing/Hero"


const Page = () => {
    return (
        <main className="flex flex-col justify-start items-center py-40 px-10 min-h-screen gap-40">
            <Hero />
            <Image
                src="/assets/landing-image.png"
                width={0}
                height={0}
                sizes="100vw"
                alt= "Image representing kanban methodology"
                style={{ width: '100%', height: '100%' }} // optional
            />
        </main>

    )
}

export default Page
