import React, { createRef, useEffect, useState } from "react";
import Image from "next/image";
import { SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import _ from "lodash";

import SearchModal from "./SearchModal";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { CardFields } from "./Cards";
import { Popover, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";

interface HeroProps {
  placeholder: string;
  images: CardFields[];
}

const Hero = ({ placeholder, images }: HeroProps) => {
  const initialHeroObject = _.sample(images);

  const [searchInput, setSearchInput] = useState("");
  const [isSearchModalOpen, setModal] = useState<boolean>(false);
  const [headerImage, setHeaderImage] = useState<string>(
    initialHeroObject?.urls.regular as string
  );
  const [photoBy, setPhotoBy] = useState<string>(
    initialHeroObject?.user?.name as string
  );
  const router = useRouter();
  // const ref = createRef<HTMLDivElement>();

  // // Handle Closing of search modal
  // useEffect(() => {
  //   const listener = (event: any) => {
  //     // Do nothing if clicking ref's element or descendent elements
  //     if (!ref.current || ref.current.contains(event.target)) {
  //       return;
  //     }
  //     // Otherwise close the modal
  //     handleClose();
  //   };

  //   document.addEventListener("mousedown", listener);
  //   document.addEventListener("touchstart", listener);
  //   return () => {
  //     document.removeEventListener("mousedown", listener);
  //     document.removeEventListener("touchstart", listener);
  //   };
  // });

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
    setModal(false);
  };

  return (
    <div className="relative h-[310px] md:h-[594px] w-full mb-4">
      <Image src={headerImage} layout="fill" objectFit="cover" />
      <div className="absolute flex left-0 bottom-0 text-white text-xs p-3 space-x-1">
        <p className="font-bold cursor-pointer">Photo</p>
        <p>by</p>
        {/* <p className="font-bold cursor-pointer">{photoBy}</p> */}
      </div>
      <ChevronRightIcon
        onClick={async () => {
          const hero = _.sample(images);
          setHeaderImage(hero?.urls.regular as string);
          setPhotoBy(hero?.user.name as string);
        }}
        className="absolute h-12 w-12 right-0 bottom-0 text-white text-md p-3 cursor-pointer"
      />

      <div className="relative top-1/4 left-[10%] sm:left-1/4">
        <p className="text-white font-bold text-4xl mb-3">Unsplash</p>
        <p className="text-white text-large">
          The internet’s source of freely-usable images.
        </p>
        <p className="text-white text-large">Powered by creators everywhere.</p>

        {/* Search box */}

        <div className="relative w-1/2 max-w-4xl invisible sm:visible">
          <Popover className="">
            <form
              onSubmit={(event) => {
                search(event);
              }}
              className="flex items-center space-x-2 border-2 rounded-md outline-none border-gray-200 bg-white px-3 py-4 mt-4 mb-2"
            >
              <SearchIcon
                className="h-5 w-5 text-gray-500 cursor-pointer"
                onClick={search}
              />
              <Popover.Button className="flex-1 bg-transparent outline-none placeholder-gray-500 text-sm">
                <input
                  className="w-full"
                  type="text"
                  placeholder={placeholder}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </Popover.Button>
              <button type="submit" hidden />
            </form>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel className="">
                <SearchModal />
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
        <div className="flex items-center invisible sm:visible">
          <p className="text-white text-sm font-[500] mr-1">Trending:</p>
          <p className="text-white text-sm">
            flower, wallpapers, backgrounds, happy, love
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
