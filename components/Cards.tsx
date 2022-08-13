import React from "react";
import Card from "./Card";

type CardsProps = {
  imageCards: CardFields[];
};

export type CardFields = {
  id: string;
  description: string;
  user: User;
  urls: Urls;
};

export type LikedCardFields = CardFields & { createdAt: Date };

type User = {
  id?: string;
  name: string;
  username?: string;
  profile_image: ProfileImage;
};

type Urls = {
  full?: string;
  regular: string;
};

type ProfileImage = {
  large: string;
};

const Cards = ({ imageCards }: CardsProps) => {
  return (
    <div className="sm:columns-3 xs:columns-1 max-w-7xl mx-auto px-4 mt-16 gap-8">
      {imageCards.map((card: CardFields) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default Cards;
