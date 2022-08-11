import { useUser } from "@auth0/nextjs-auth0";
import {
  PhotographIcon,
  HeartIcon,
  ChartBarIcon,
  CollectionIcon,
} from "@heroicons/react/outline";
import {
  query,
  collection,
  where,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Cards, { CardFields } from "./Cards";
import Tabs, { TabsData } from "./Tabs";

const ProfileTabs = () => {
  const [collections, setCollections] = useState<DocumentData[]>([]);
  const [likes, setLikes] = useState<CardFields[]>([]);
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const q = query(
      collection(db, "collections"),
      where("userId", "==", user?.sub)
    );
    const unsubscribe: DocumentData = onSnapshot(q, (querySnapshot) => {
      setCollections(querySnapshot.docs);

      return unsubscribe;
    });
  }, [db]);

  useEffect(() => {
    const q = query(
      collection(db, "likes"),
      where("likedByUserId", "==", user?.sub)
    );
    const unsubscribe: DocumentData = onSnapshot(q, (querySnapshot) => {
      const likedData: CardFields[] = [];
      querySnapshot.forEach((doc) => {
        console.log("timestamp", doc.data().timestamp);

        likedData.push({
          id: doc.data().imageId,
          description: doc.data().description,
          createdAt: doc.data().timestamp.seconds,
          user: {
            name: doc.data().name,
            profile_image: {
              large: doc.data().userProfileImage,
            },
          },
          urls: {
            regular: doc.data().imageURL,
          },
        });
      });

      setLikes(likedData);

      return unsubscribe;
    });
  }, [db]);

  const tabs: TabsData[] = [
    {
      tabName: "Photos",
      tabIcon: <PhotographIcon />,
      count: 0,
    },
    {
      tabName: "Likes",
      tabIcon: <HeartIcon />,
      count: likes.length,
      tabContent: <Cards imageCards={likes} />,
    },
    {
      tabName: "Collections",
      tabIcon: <CollectionIcon />,
      count: collections.length,
      tabContent: (
        <>
          {collections.map((collection) => (
            <div>{collection.data().name}</div>
          ))}
        </>
      ),
    },
    {
      tabName: "Stats",
      tabIcon: <ChartBarIcon />,
    },
  ];

  return <Tabs tabsData={tabs} />;
};

export default ProfileTabs;
