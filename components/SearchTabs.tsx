import { PhotographIcon, CollectionIcon } from "@heroicons/react/outline";
import { UsersIcon } from "@heroicons/react/solid";

import Cards, { CardFields } from "./Cards";
import Tabs, { TabsData } from "./Tabs";

type SearchTabsProps = {
  photos: CardFields[];
  imagesTotal: number;
};

const SearchTabs = ({ photos, imagesTotal }: SearchTabsProps) => {
  const tabs: TabsData[] = [
    {
      tabName: "Photos",
      tabIcon: <PhotographIcon />,
      count: imagesTotal,
      tabContent: <Cards imageCards={photos} />,
    },
    {
      tabName: "Collections",
      tabIcon: <CollectionIcon />,
      count: 0,
    },
    {
      tabName: "Users",
      tabIcon: <UsersIcon />,
      count: 0,
    },
  ];

  return <Tabs tabsData={tabs} />;
};

export default SearchTabs;
