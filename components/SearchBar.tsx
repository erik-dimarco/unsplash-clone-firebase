import { Transition } from "@headlessui/react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { createRef, useEffect, useState } from "react";

import SearchModal from "./SearchModal";

type SearchBarProps = {
  variant: string;
  placeholder?: string;
};

const SearchBar = ({ variant, placeholder }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isSearchModalOpen, setModal] = useState<boolean>(false);

  const router = useRouter();
  const ref = createRef<HTMLDivElement>();

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
    setModal(false);
  };

  const handleXClick = () => {
    setSearchInput("");
    setModal(true);
  };

  return (
    <div ref={ref}>
      <form
        onSubmit={(event) => {
          search(event);
        }}
        className={`flex items-center space-x-2 px-3 border-gray-200 ${
          variant === "header"
            ? "border rounded-full outline-none bg-gray-100 py-2 focus-within:bg-white hover:border-gray-300"
            : "border-2 rounded-md outline-none bg-white mt-4 mb-2 py-4"
        }`}
      >
        <SearchIcon
          className="h-5 w-5 text-gray-500 cursor-pointer"
          onClick={search}
        />
        <div
          onClick={() => setModal(true)}
          className={`flex-1 outline-none placeholder-gray-500 text-xs md:text-sm ${
            variant === "hero" ? "bg-transparent" : ""
          }`}
        >
          <input
            className="w-full bg-transparent outline-none"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={placeholder ?? "Search free high-resolution photos"}
          />
        </div>
        <div onClick={handleXClick}>
          {searchInput && (
            <XIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
          )}
        </div>
        <button type="submit" hidden />
      </form>
      <Transition
        show={isSearchModalOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <SearchModal />
      </Transition>
    </div>
  );
};

export default SearchBar;
