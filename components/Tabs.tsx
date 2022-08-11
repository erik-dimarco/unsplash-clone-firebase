import { Tab } from "@headlessui/react";

import Footer from "./Footer";

type TabsProps = {
  tabsData: TabsData[];
};

export type TabsData = {
  tabName: string;
  tabIcon: JSX.Element;
  count?: number;
  tabContent?: JSX.Element;
};

const Tabs = ({ tabsData }: TabsProps) => {
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex max-w-md space-x-8 p-1 ml-8 mt-10">
          {tabsData.map((tab) => (
            <Tab
              className={({ selected }) =>
                classNames(
                  "py-2.5 pb-4 text-sm font-medium focus:outline-none",
                  selected
                    ? "border-b-2 border-b-gray-900"
                    : "text-gray-500 hover:bg-white/[0.12] hover:text-black"
                )
              }
            >
              <div className="flex items-center justify-center space-x-1">
                <div className="h-5 w-5 mr-1">{tab.tabIcon}</div>
                <p className="">{tab.tabName}</p>
                <p>
                  {tab.count && tab.count >= 1000
                    ? tab.count / 1000 + "k"
                    : tab.count}
                </p>
              </div>
            </Tab>
          ))}
        </Tab.List>
        <div className="block mt-4 border-b w-full border-b-gray-400"></div>
        <Tab.Panels className="mt-2">
          {tabsData.map((tab) => (
            <Tab.Panel className="mt-5 text-black max-w-[1320px] mx-auto">
              {tab?.count && tab.count > 0 ? (
                <div className="mt-6 mb-6">{tab.tabContent}</div>
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
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
