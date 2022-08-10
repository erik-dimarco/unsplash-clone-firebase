import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";

type JoinProps = {};

const Join = ({}: JoinProps) => {
  const { user, error, isLoading } = useUser();

  // const handleLogin = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     const userData = await signup();
  //     console.log(userData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mb-6">Join Unsplash</h1>
          <div className="flex space-x-2">
            <p className="text-sm mb-6">Already have an account?</p>
            <p className="underline text-sm text-gray-500">Login</p>
          </div>
        </div>
        <div
          // onClick={handleLogin}
          className="flex justify-center mt-10 pr-2 bg-[#3F7EE8] rounded-md p-1 shadow-sm items-center"
        >
          <div className="bg-white p-2 h-full mr-2 items-center justify-center cursor-pointer">
            <img src="/Google__G__Logo.svg" />
          </div>
          <button className="text-white">Join using Google</button>
        </div>
        <div className="my-10 text-sm">
          <p>OR</p>
        </div>

        {/* form */}
        <div className="flex items-center justify-center">
          <form>
            <div className="flex space-x-4">
              <div className="flex-col">
                <label className="flex text-sm">First name</label>
                <input
                  type="text"
                  className="flex border border-gray-800 rounded-md p-2"
                />
              </div>
              <div className="flex-col">
                <label className="flex text-sm">First name</label>
                <input
                  type="text"
                  className="flex border border-gray-800 rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex mt-4">
              <div className="">
                <label className="flex text-sm">First name</label>
                <input
                  type="text"
                  className="flex border border-gray-800 rounded-md p-2"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Join;
