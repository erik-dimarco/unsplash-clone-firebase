import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { CardFields } from "../components/Cards";
import Header from "../components/Header";
import SearchTabs from "../components/SearchTabs";

type Props = {};

const Search = ({}: Props) => {
  const router = useRouter();
  const { topic } = router.query;
  const searchString = topic as string;

  const [searchResults, setSearchResults] = useState<CardFields[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [resultsPerPage, setResultsPerPage] = useState<number>(25);
  const [imagesTotal, setImagesTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true);

  useEffect(() => {
    if (searchString) {
      const results = async () => {
        const resCards = await fetch(
          `https://api.unsplash.com/search/photos?&page=${pageNumber}&query=${searchString}&per_page=${resultsPerPage}&order_by=popular&client_id=LybcoBkZTUjRLs2BXCnfz6Z-gAJTdC8uUa-F68hSeS0`
        );

        const imageCards = await resCards.json();

        const cards = imageCards.results.map((card: CardFields) => {
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

        if (pageNumber === 1) {
          setSearchResults(imageCards.results);
          setImagesTotal(imageCards.total);
          setTotalPages(imageCards.total_pages);
        } else {
          setSearchResults([...searchResults, ...imageCards.results]);
        }
      };

      results();
    }
  }, [searchString, pageNumber, resultsPerPage]);

  const getMoreSearchResults = async () => {
    setPageNumber(pageNumber + 1);
    setHasMoreResults(totalPages > pageNumber);
  };

  return (
    <div className="h-screen">
      <Header placeholder={searchString} />

      <section className="flex-grow mt-4">
        <InfiniteScroll
          dataLength={searchResults.length}
          next={getMoreSearchResults}
          hasMore={hasMoreResults}
          loader={<></>}
          endMessage={<p className="text-center"> End of search results</p>}
        >
          <div className="flex">
            <SearchTabs photos={searchResults} imagesTotal={imagesTotal} />
          </div>
        </InfiniteScroll>
      </section>
    </div>
  );
};

export default Search;
