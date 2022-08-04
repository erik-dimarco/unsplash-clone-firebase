import React from "react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";

type SignInProps = {
  providers: any;
};

const SignIn = ({ providers }: SignInProps) => {
  const router = useRouter();

  return (
    <>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
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
