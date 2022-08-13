import Image from "next/image";
import React, { createRef, useEffect, useRef, useState } from "react";
import { MenuIcon, SearchIcon } from "@heroicons/react/solid";
import { BellIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

import SearchModal from "./SearchModal";
import { useUser } from "@auth0/nextjs-auth0";
import { XIcon } from "@heroicons/react/outline";
import SearchBar from "./SearchBar";
interface HeaderProps {
  placeholder?: string;
}

function Header({ placeholder }: HeaderProps) {
  const { user } = useUser();

  const router = useRouter();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    router.push("/api/auth/logout");
  };

  return (
    <div className="sticky top-0 z-10">
      <div className="flex bg-white px-4 py-3 shadow-sm items-center justify-end">
        <div
          onClick={() => router.push("/")}
          className="relative h-8 w-8 flex-shrink-0 cursor-pointer items-center mr-4"
        >
          <Image objectFit="contain" src="/logo.svg" layout="fill" />
        </div>

        {/* Search box */}
        <div className="flex-1 relative">
          <SearchBar variant="header" placeholder={placeholder} />
        </div>

        {/* Buttons */}
        <div className="hidden md:flex">
          <div className="flex ml-8 space-x-6 text-gray-600 text-sm items-center">
            <p className="hover:font-semibold hover:text-black cursor-pointer">
              Explore
            </p>
            <p className="hover:font-semibold hover:text-black cursor-pointer">
              Advertise
            </p>
            <p className="hover:font-semibold hover:text-black cursor-pointer">
              Blog
            </p>
          </div>
          <div className="flex mx-8 text-gray-600 items-center">
            <div className="border-l-2 h-10"></div>
          </div>
          <div className="flex text-gray-600 space-x-3 text-sm items-center">
            {!user && (
              <>
                <p
                  onClick={() => router.push("/api/auth/login")}
                  className="hover:font-semibold hover:text-black cursor-pointer"
                >
                  Log in
                </p>
                <p>/</p>
                <p
                  onClick={() => router.push("/api/auth/login")}
                  className="hover:font-semibold hover:text-black cursor-pointer"
                >
                  Sign up
                </p>
              </>
            )}
            <button className="border-2 border-gray-300 rounded-md p-2 text-sm">
              Submit a photo
            </button>
            {user && (
              <>
                <BellIcon className="h-6 w-6 text-gray-500 -rotate-[15deg] hover:text-black cursor-pointer" />
                <Popover className="">
                  <Popover.Button className="h-8 w-8 rounded-full hover:text-black cursor-pointer focus:outline-none">
                    <img
                      className="rounded-full"
                      src={user.picture as string}
                    />
                  </Popover.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Popover.Panel className="absolute -left-36 top-2 min-w-[185px] bg-white border rounded-md shadow-md border-gray-300 text-gray-500">
                      <div className="absolute right-3 -top-1 border border-gray-300 h-6 w-6 rotate-45 bg-white overflow-hidden -z-10"></div>
                      <div className="absolute right-4 -top-4 border-2 border-b-white border-t-transparent border-x-transparent h-4 w-4"></div>
                      <div
                        onClick={() => router.push("/profile")}
                        className="flex min-w-full hover:bg-gray-100 hover:text-gray-700 p-3 cursor-pointer"
                      >
                        <p className="text-sm">View profile</p>
                      </div>
                      <div className="flex min-w-full hover:bg-gray-100 hover:text-gray-700 p-3 cursor-pointer">
                        <p className="text-sm">Trending Searches</p>
                      </div>
                      <div className="flex min-w-full hover:bg-gray-100 hover:text-gray-700 p-3 cursor-pointer">
                        <p className="text-sm">Trending Topics</p>
                      </div>
                      <div className="">
                        <p className="min-w-full h-1 border-t border-gray-300"></p>
                        <div
                          onClick={handleLogout}
                          className="flex min-w-full hover:bg-gray-100 hover:text-gray-700 p-3 cursor-pointer"
                        >
                          <p>Logout {`@${user.nickname}`}</p>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </>
            )}
          </div>
        </div>
        <div className="md:hidden ml-6">
          <Popover className="">
            <Popover.Button className="flex flex-shrink-0 items-center">
              <MenuIcon className="flex h-8 w-8 cursor-pointer" />
            </Popover.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel className="absolute -left-36 top-2 min-w-[185px] bg-white border rounded-md shadow-md border-gray-300 text-gray-500">
                <div className="absolute right-3 -top-1 border border-gray-300 h-6 w-6 rotate-45 bg-white overflow-hidden -z-10"></div>
                <div className="absolute right-4 -top-4 border-2 border-b-white border-t-transparent border-x-transparent h-4 w-4"></div>
                <div
                  onClick={() => router.push("/profile")}
                  className="flex min-w-full hover:bg-gray-100 hover:text-gray-700 p-3 cursor-pointer"
                >
                  <p className="text-sm">View profile</p>
                </div>
                <div className="flex min-w-full hover:bg-gray-100 hover:text-gray-700 p-3 cursor-pointer">
                  <p className="text-sm">Trending Searches</p>
                </div>
                <div className="flex min-w-full hover:bg-gray-100 hover:text-gray-700 p-3 cursor-pointer">
                  <p className="text-sm">Trending Topics</p>
                </div>
                <div className="">
                  <p className="min-w-full h-1 border-t border-gray-300"></p>
                  {user ? (
                    <div
                      onClick={handleLogout}
                      className="flex min-w-full hover:bg-gray-100 hover:text-gray-700 p-3 cursor-pointer"
                    >
                      <p>Logout {`@${user.nickname}`}</p>
                    </div>
                  ) : (
                    <div
                      onClick={() => router.push("/api/auth/login")}
                      className="flex min-w-full hover:bg-gray-100 hover:text-gray-700 p-3 cursor-pointer"
                    >
                      <p>Login or Signup</p>
                    </div>
                  )}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Header;
