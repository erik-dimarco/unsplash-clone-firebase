import { useRouter } from "next/router";
import React from "react";
import Header from "../components/Header";

type Props = {
  searchResults: SearchResults[];
};

const Search = ({ searchResults }: Props) => {
  const router = useRouter();
  const { topic } = router.query;
  const searchString = topic as string;

  return (
    <div className="h-screen">
      <Header placeholder={searchString} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {/* {searchResults.map(
              ({
                img,
                location,
                title,
                description,
                star,
                price,
                total,
                long,
                lat,
              }: SearchResults) => (
                // <InfoCard
                //   key={img}
                //   img={img}
                //   location={location}
                //   title={title}
                //   description={description}
                //   star={star}
                //   price={price}
                //   total={total}
                //   long={long}
                //   lat={lat}
                // />
              )
            )} */}
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Search;

interface SearchResults {
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: string;
  long: number;
  lat: number;
}

export const getServerSideProps = async () => {
  const res = await fetch("https://links.papareact.com/isz");
  const searchResults: SearchResults[] = await res.json();

  return {
    props: {
      searchResults,
    },
  };
};
