import { Button } from "@/components/ui/button"
import { Mail, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

const Hero = () => {
    const [loginClicked, setLoginClicked] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        setLoginClicked(true);
        router.push('/login')
    }

    return (
        <div className="flex flex-col md:flex-row justify-center items-center text-center gap-20 md:gap-6 w-full">
            <h1 className="text-6xl md:text-8xl inline w-full font-semibold">Just that simple.</h1>

            <div className="flex flex-col justify-center items-center gap-10 h-full ">
                <p className="text-xl md:text-2xl">
                   Transforming ideas into exceptional solutions through innovative design and technology 
                </p>



                {!loginClicked ? (
                    <Button onClick={handleClick}>
                        <Mail className="mr-2 h-4 w-4" /> Login with Email
                    </Button>
                ) : (
                    <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                )}
            </div>

        </div >
    );
}
export default Hero
