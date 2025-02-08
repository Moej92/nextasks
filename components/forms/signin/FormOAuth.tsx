"use client";

import Button from "@/components/shared/Button";
import { signInAction } from "@/lib/actions/auth";
import Image from "next/image";
import { PulseLoader } from "react-spinners";
import { useState } from "react";

const FormOAuth = () => {
    const [isSigningIn, setIsSigningIn] = useState(false);

    const handleSignIn = async (provider: string) => {
        setIsSigningIn(true);
        await signInAction(provider);
    }

    return (
        <div className="flex flex-col items-center sm:flex-row gap-5">
                <Button
                    type="submit"
                    btnBg="bg-white"
                    btnTextColor="text-purple-900"
                    customStyles="signin-btn hover:shadow-purple-900"
                    handleClick={() => handleSignIn("github")}
                >
                    <Image 
                        src="/github.svg"
                        alt="github-logo"
                        width={22}
                        height={22}
                    />
                    Continue with Github
                </Button>

                <Button
                    type="submit"
                    btnBg="bg-purple-800"
                    btnTextColor="text-white"
                    customStyles="signin-btn hover:shadow-purple-100"
                    handleClick={() => handleSignIn("google")}
                >
                    <Image 
                        src="/google.svg"
                        alt="google-logo"
                        width={22}
                        height={22}
                    />
                    Continue with Google
                </Button>

            {isSigningIn && (
                <div className="fixed left-0 top-0 w-screen h-screen bg-[#02000555] flex justify-center items-center z-40">
                    <PulseLoader 
                        size={18}
                        color="#ffffff"
                    />
                </div>
            )}
        </div>
    );
}
 
export default FormOAuth;