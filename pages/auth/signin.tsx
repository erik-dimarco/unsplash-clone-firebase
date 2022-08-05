import React from "react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

type SignInProps = {
  providers: any;
};

const SignIn = ({ providers }: SignInProps) => {
  const router = useRouter();

  return (
    <>
      {Object.values(providers).map((provider: any) => (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="flex flex-col items-center justify-center">
            <div
              onClick={() => router.push("/")}
              className="relative h-20 w-20 flex-shrink-0 cursor-pointer mb-6"
            >
              <Image objectFit="contain" src="/logo.svg" layout="fill" />
            </div>
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            <p className="text-sm mb-6">Welcome back.</p>
          </div>
          <div
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            key={provider.name}
            className="flex  pr-2 bg-[#3F7EE8] rounded-md p-1 shadow-sm items-center justify-center"
          >
            <div className="bg-white p-2 h-full mr-2 items-center justify-center cursor-pointer">
              <img src="/Google__G__Logo.svg" />
            </div>
            <button className="text-white">Sign in with {provider.name}</button>
          </div>
        </div>
      ))}
    </>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default SignIn;
