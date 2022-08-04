import React from "react";
import { CardFields } from "./Cards";
import DownloadButton from "./DownloadButton";
import HeartButton from "./HeartButton";
import PlusButton from "./PlusButton";

type CardProps = {
  card: CardFields;
};

function Card({ card }: CardProps) {
  return (
    <div key={card.id} className="group relative">
      <div className="">
        <img
          src={card.urls.regular}
          className="mb-8 cursor-zoom-in hover:brightness-75 transition-all ease-in-out duration-100"
        />
        <div className="invisible group-hover:visible absolute top-6 right-6 transition-all ease-in-out duration-100">
          <div className="flex items-center space-x-2">
            <HeartButton />
            <PlusButton />
          </div>
        </div>
        <div className="invisible group-hover:visible absolute bottom-6 left-6 transition-all ease-in-out duration-100">
          <div className="flex items-center justify-between">
            <img
              className="h-9 w-9 bg-white rounded-full mr-2"
              src={card.user.profile_image.large}
            />
            <div className="flex-col">
              <p className="text-white text-md">{card.user.name}</p>
              {card.description && (
                <p className="text-white text-xs truncate w-60">
                  {card.description}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mx-4 absolute bottom-6 right-2 invisible group-hover:visible transition-all ease-in-out duration-100">
          <DownloadButton />
        </div>
      </div>
    </div>
  );
}

export default Card;
