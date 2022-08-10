import { useUser } from "@auth0/nextjs-auth0";
import { Tab } from "@headlessui/react";
import {
  PhotographIcon,
  HeartIcon,
  CollectionIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";
import { UsersIcon } from "@heroicons/react/solid";
import {
  query,
  collection,
  where,
  DocumentData,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import Image from "next/image";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Cards, { CardFields } from "./Cards";
import Footer from "./Footer";

type SearchTabsProps = {
  photos: CardFields[];
  imagesTotal: number;
};

const SearchTabs = ({ photos, imagesTotal }: SearchTabsProps) => {
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex max-w-md space-x-8 p-1 ml-8 mt-10">
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2.5 pb-4 text-sm font-medium focus:outline-none",
                "",
                selected
                  ? "border-b-2 border-b-gray-900"
                  : "text-gray-500 hover:bg-white/[0.12] hover:text-black"
              )
            }
          >
            <div className="flex items-center justify-center">
              <PhotographIcon className="h-5 w-5" />
              <p className="ml-2">Photos</p>
              <p className="ml-1">{imagesTotal}</p>
            </div>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2.5 pb-4 text-sm font-medium focus:outline-none",
                "",
                selected
                  ? "border-b-2 border-b-gray-900"
                  : "text-gray-500 hover:bg-white/[0.12] hover:text-black"
              )
            }
          >
            <div className="flex items-center justify-center">
              <CollectionIcon className="h-5 w-5" />
              <p className="ml-2">Collections</p>
              <p className="ml-1">0</p>
            </div>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2.5 pb-4 text-sm font-medium focus:outline-none",
                "",
                selected
                  ? "border-b-2 border-b-gray-900"
                  : "text-gray-500 hover:bg-white/[0.12] hover:text-black"
              )
            }
          >
            <div className="flex items-center justify-center">
              <UsersIcon className="h-5 w-5" />
              <p className="ml-2">Users</p>
              <p className="ml-1">0</p>
            </div>
          </Tab>
        </Tab.List>
        <div className="block mt-4 border-b w-full border-b-gray-400"></div>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="mt-5 text-black max-w-[1320px] mx-auto">
            {photos.length > 0 ? (
              <div className="mt-6 mb-6">
                <Cards imageCards={photos} />
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-1/4 h-auto mb-40">
                    <img src="https://unsplash.com/a/img/empty-states/photos.png" />
                  </div>
                  <Footer />
                </div>
              </>
            )}
          </Tab.Panel>
          <Tab.Panel className="mt-5 text-black max-w-[1320px] mx-auto">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-1/4 h-auto mb-40">
                <img src="https://unsplash.com/a/img/empty-states/photos.png" />
              </div>
              <Footer />
            </div>
          </Tab.Panel>
          <Tab.Panel />
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SearchTabs;
