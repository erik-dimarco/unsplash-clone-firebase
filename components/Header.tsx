import Image from "next/image";
import React, { createRef, useEffect, useState } from "react";
import {
  ChevronDownIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import {
  ChatIcon,
  ChevronUpIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { BellIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import Home from "../pages";
import { useRouter } from "next/router";
import SearchModal from "./SearchModal";
import { signOut, useSession } from "next-auth/react";
import ProfileModal from "./ProfileModal";

interface HeaderProps {
  placeholder?: string;
}

function Header({ placeholder }: HeaderProps) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isSearchModalOpen, setSearchModal] = useState<boolean>(false);
  const router = useRouter();
  const ref = createRef<HTMLDivElement>();
  const { data: session } = useSession();

  // Handle Closing of search modal
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Otherwise close the modal
      handleClose();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  });

  const search = (event: any) => {
    event.preventDefault();
    if (searchInput) {
      router.push({
        pathname: "/search",
        query: { topic: searchInput },
      });

      resetInput();
    }
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const handleClose = () => {
    setSearchModal(false);
  };

  return (
    <div className="sticky top-0 z-10">
      <div className="flex bg-white px-4 py-3 shadow-sm items-center box-border">
        <div
          onClick={() => router.push("/")}
          className="relative h-8 w-8 flex-shrink-0 cursor-pointer items-center mr-4"
        >
          <Image objectFit="contain" src="/logo.svg" layout="fill" />
        </div>

        {/* Search box */}
        <div ref={ref} className="flex-1 relative">
          <form
            onSubmit={(event) => {
              search(event);
            }}
            className="flex items-center space-x-2 border rounded-full outline-none border-gray-200 bg-gray-100 focus-within:bg-white hover:border-gray-300 px-3 py-2"
          >
            <SearchIcon
              className="h-5 w-5 text-gray-500 cursor-pointer"
              onClick={search}
            />
            <input
              className="flex-1 bg-transparent outline-none placeholder-gray-500 text-sm"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={placeholder ?? "Search free high-resolution photos"}
              onClick={() => setSearchModal(true)}
            />

            <button type="submit" hidden />
          </form>
          <SearchModal isOpen={isSearchModalOpen} searchInput={searchInput} />
        </div>

        {/* Buttons */}
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
          {!session && (
            <>
              <p
                onClick={() => router.push("/auth/signin")}
                className="hover:font-semibold hover:text-black cursor-pointer"
              >
                Log in
              </p>
              <p>/</p>
              <p className="hover:font-semibold hover:text-black cursor-pointer">
                Sign up
              </p>
            </>
          )}
          <button className="border-2 border-gray-300 rounded-md p-2 text-sm">
            Submit a photo
          </button>
          {session && (
            <>
              <BellIcon className="h-6 w-6 text-gray-500 -rotate-[15deg] hover:text-black cursor-pointer" />
              <Popover className="">
                <Popover.Button className="h-8 w-8 rounded-full hover:text-black cursor-pointer focus:outline-none">
                  <img
                    className="rounded-full"
                    src={session?.user?.image as string}
                    alt="profile"
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
                    <div className="flex min-w-full hover:bg-gray-100 hover:text-gray-700 p-3 cursor-pointer">
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
                        onClick={() => signOut()}
                        className="flex min-w-full hover:bg-gray-100 hover:text-gray-700 p-3 cursor-pointer"
                      >
                        <p>Logout {`@${session.user?.name}`}</p>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </>
          )}
          <MenuIcon className="h-6 w-6 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Header;
