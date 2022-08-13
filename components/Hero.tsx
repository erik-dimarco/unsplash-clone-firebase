import React, { useState } from "react";
import Image from "next/image";
import _ from "lodash";

import { ChevronRightIcon } from "@heroicons/react/outline";
import { CardFields } from "./Cards";
import SearchBar from "./SearchBar";

interface HeroProps {
  placeholder: string;
  images: CardFields[];
}

const Hero = ({ placeholder, images }: HeroProps) => {
  const initialHeroObject = _.sample(images);

  const [headerImage, setHeaderImage] = useState<string>(
    initialHeroObject?.urls.regular as string
  );
  const [photoby, setPhotoBy] = useState<string>(
    initialHeroObject?.user?.name as string
  );

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

      <div className="absolute w-[75%] top-1/4 left-16 md:left-40 md:w-[70%] ">
        <p className="relative text-white font-bold text-4xl mb-3">Unsplash</p>
        <p className="relative text-white text-large">
          The internet’s source of freely-usable images.
        </p>
        <p className="relative text-white text-large">
          Powered by creators everywhere.
        </p>

        {/* Search box */}

        <div className="relative w-full invisible sm:visible">
          <SearchBar variant="hero" placeholder={placeholder} />
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
