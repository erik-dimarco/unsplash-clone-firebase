import { UsersIcon } from "@heroicons/react/solid";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { TrendingUpIcon } from "@heroicons/react/solid";
import Image from "next/image";

type ProfileModalProps = {
  isOpen: boolean;
};

const SearchModal = ({ isOpen }: ProfileModalProps) => {
  const router = useRouter();

  return (
    <>
      {isOpen && (
        <div className="absolute z-50 top-12 right-0 bg-white p-3 border rounded-md shadow-md border-gray-200">
          <div className="flex items-center mb-4">
            <h2 className="text-sm font-semibold">Recent Searches</h2>
            <p className="rounded-full h-[3px] w-[3px] bg-gray-700 mx-[6px]"></p>
            <button
              // onClick={() => setRecentSearches([])}
              className="text-sm text-gray-500 cursor-pointer hover:text-gray-800"
            >
              Clear
            </button>
          </div>
          <div className="flex items-center">
            <h2 className="text-sm font-semibold mb-4">Trending Searches</h2>
          </div>
          <div className="flex items-center mb-4">
            <h2 className="text-sm font-semibold">Trending Topics</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
