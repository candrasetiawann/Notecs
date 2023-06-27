"use client"
import { signIn } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Login = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const {status} = useSession()
  if (status === "authenticated"){
    redirect('/')
  }
  return (
    <div className="flex flex-col">
      <Image
        className="mx-auto mt-20"
        alt="logo"
        src="/img/logo1.webp"
        width={300}
        height={300}
      />
      <p className="text-center pt-1 text-white">
        Documenting Your Ideas and Insights
      </p>
      <button
        className="border-2 box-shadow-offset-black1 bg-amber-400 border-black px-4 py-2 mt-14 mx-14"
        onClick={() => signIn("google",callbackUrl)}
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
