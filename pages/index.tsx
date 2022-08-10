import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Cards, { CardFields } from "../components/Cards";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  heroCarousel: CardFields[];
};

const Home = ({ heroCarousel }: Props) => {
  const [popularPhotos, setPopularPhotos] = useState<CardFields[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    const initialPopularPhotos = async () => {
      const resCards = await fetch(
        `https://api.unsplash.com/photos?&page=${pageNumber}&per_page=25&order_by=popular&client_id=LybcoBkZTUjRLs2BXCnfz6Z-gAJTdC8uUa-F68hSeS0`
      );

      const imageCards = await resCards.json();

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

      setPopularPhotos(cards);
    };

    initialPopularPhotos();
  }, []);

  const getMoreSearchResults = async () => {
    setPageNumber(pageNumber + 1);

    const resCards = await fetch(
      `https://api.unsplash.com/photos?&page=${pageNumber}&per_page=25&order_by=popular&client_id=LybcoBkZTUjRLs2BXCnfz6Z-gAJTdC8uUa-F68hSeS0`
    );

    const imageCards = await resCards.json();

    const moreCards = imageCards.map((card: CardFields) => {
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

    setPopularPhotos((popularPhotos) => [...popularPhotos, ...moreCards]);
  };

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
          <InfiniteScroll
            dataLength={popularPhotos.length}
            next={getMoreSearchResults}
            hasMore={pageNumber < 101}
            loader={<></>}
            endMessage={<p className="text-center"> End of curated photos.</p>}
          >
            <Cards imageCards={popularPhotos} />
          </InfiniteScroll>
        </section>
        <Modal />
      </main>

      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const resHero = await fetch(
    `https://api.unsplash.com/photos?page=1&per_page=10&client_id=LybcoBkZTUjRLs2BXCnfz6Z-gAJTdC8uUa-F68hSeS0`
  );

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
      heroCarousel,
    },
  };
};
