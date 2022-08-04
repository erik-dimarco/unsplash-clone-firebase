import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Cards, { CardFields } from "../components/Cards";
import Header from "../components/Header";
import Hero from "../components/Hero";

type Props = {
  cards: CardFields[];
  heroCarousel: CardFields[];
};

const Home = ({ cards, heroCarousel }: Props) => {
  return (
    <div>
      <Head>
        <title>Unsplash Image API</title>
        <link rel="icon" href="/logo.svg" />
      </Head>

      <main>
        <section className="inline">
          <Header />
        </section>
        <section className="">
          <Hero
            placeholder="Search free high-resolution photos"
            images={heroCarousel}
          />
        </section>
        <section className="max-w-[1320px] mx-auto">
          <Cards imageCards={cards} />
        </section>
      </main>

      {/* <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer> */}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const resCards = await fetch(
    "https://api.unsplash.com/photos?page=1&per_page=50&order_by=popular&client_id=LybcoBkZTUjRLs2BXCnfz6Z-gAJTdC8uUa-F68hSeS0"
  );

  const resHero = await fetch(
    "https://api.unsplash.com/photos?page=1&per_page=10&client_id=LybcoBkZTUjRLs2BXCnfz6Z-gAJTdC8uUa-F68hSeS0"
  );

  const imageCards: CardFields[] = await resCards.json();

  const cards = imageCards.map((card: CardFields) => {
    return {
      id: card.id,
      description: card.description,
      user: {
        id: card.user.id,
        name: card.user.name,
        username: card.user.username,
        profile_image: card.user.profile_image,
      },
      urls: {
        full: card.urls.full,
        regular: card.urls.regular,
      },
    };
  });

  const heroOptions: CardFields[] = await resHero.json();

  const heroCarousel = heroOptions.map((card: CardFields) => {
    return {
      id: card.id,
      description: card.description,
      user: {
        id: card.user.id,
        name: card.user.name,
        username: card.user.username,
        profile_image: card.user.profile_image,
      },
      urls: {
        full: card.urls.full,
        regular: card.urls.regular,
      },
    };
  });

  return {
    props: {
      cards,
      heroCarousel,
    },
  };
};
