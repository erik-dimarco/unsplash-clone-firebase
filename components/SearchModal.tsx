import { UsersIcon } from "@heroicons/react/solid";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { TrendingUpIcon } from "@heroicons/react/solid";
import Image from "next/image";

type SearchModalProps = {
  isOpen: boolean;
  searchInput: string;
};

const SearchModal = ({ isOpen, searchInput }: SearchModalProps) => {
  const router = useRouter();

  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Nature",
    "Beach",
    "Mountains",
    "City",
  ]);
  const [trendingSearches, setTrendingSearches] = useState<string[]>([
    "dark",
    "krishna",
    "phone wallpaper",
    "vacation",
    "ganesh",
  ]);
  const [trendingTopics, setTrendingTopics] = useState<any[]>([
    {
      title: "Travel",
      imageUrl: "https://placeimg.com/60/60/travel",
    },
    {
      title: "Health & Wellness",
      imageUrl: "https://placeimg.com/60/60/health",
    },
    {
      title: "Street Photography",
      imageUrl: "https://placeimg.com/60/60/street-photography",
    },
    {
      title: "Nature",
      imageUrl: "https://placeimg.com/60/60/nature",
    },
    {
      title: "Fashion",
      imageUrl: "https://placeimg.com/60/60/fashion",
    },
  ]);

  return (
    <>
      {isOpen && !searchInput && (
        <div className="absolute z-50 w-full mt-[2px] mx-auto bg-white p-3 border rounded-md shadow-md border-gray-200">
          {recentSearches.length > 0 && (
            <>
              <div className="flex flex-wrap items-center mb-4">
                <h2 className="text-sm font-semibold">Recent Searches</h2>
                <p className="rounded-full h-[3px] w-[3px] bg-gray-700 mx-[6px]"></p>
                <button
                  onClick={() => setRecentSearches([])}
                  className="text-sm text-gray-500 cursor-pointer hover:text-gray-800"
                >
                  Clear
                </button>
              </div>
              <div className="flex space-x-2 mb-5">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      router.push({
                        pathname: "/search",
                        query: { topic: search },
                      })
                    }
                    className="text-sm text-gray-500 cursor-pointer rounded-md border-gray-300 hover:bg-gray-100 p-3 border"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </>
          )}
          <div className="flex items-center">
            <h2 className="text-sm font-semibold mb-4">Trending Searches</h2>
          </div>
          <div className="flex space-x-2">
            {trendingSearches.map((trendingSearch, index) => (
              <button
                key={index}
                onClick={() =>
                  router.push({
                    pathname: "/search",
                    query: { topic: trendingSearch },
                  })
                }
                className="flex items-center text-sm p-3 text-gray-500 cursor-pointer hover:bg-gray-100 space-x-2 mb-5 border border-gray-300 rounded-md"
              >
                <TrendingUpIcon className="h-4 w-4 text-gray-500 mr-2" />
                {trendingSearch}
              </button>
            ))}
          </div>
          <div className="flex items-center mb-4">
            <h2 className="text-sm font-semibold">Trending Topics</h2>
          </div>
          <div className="flex space-x-2">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() =>
                  router.push({
                    pathname: "/search",
                    query: { topic: topic.title },
                  })
                }
                className="flex items-center pr-3 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 space-x-2 border border-gray-300 rounded-md"
              >
                <img src={topic.imageUrl} className="mr-4 h-10 w-10" />
                {topic.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
