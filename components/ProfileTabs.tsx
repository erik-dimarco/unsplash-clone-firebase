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
import Cards, { LikedCardFields } from "./Cards";
import CollectionDetails from "./CollectionDetails";
import Tabs, { TabsData } from "./Tabs";

const ProfileTabs = () => {
  const [collections, setCollections] = useState<DocumentData[]>([]);
  const [likes, setLikes] = useState<LikedCardFields[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "collections"),
        where("userId", "==", user.sub)
      );
      const unsubscribe: DocumentData = onSnapshot(q, (querySnapshot) => {
        setCollections(querySnapshot.docs);

        return unsubscribe;
      });
    }
  }, [db, user]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "likes"),
        where("likedByUserId", "==", user.sub)
      );
      const unsubscribe: DocumentData = onSnapshot(q, (querySnapshot) => {
        const likedData: LikedCardFields[] = [];
        querySnapshot.forEach((doc) => {
          likedData.push({
            id: doc.data().imageId,
            description: doc.data().description,
            createdAt: doc.data().timestamp
              ? new Date(doc.data().timestamp.toDate().toDateString())
              : new Date(),
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
    }
  }, [db, user]);

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
      tabContent: (
        <Cards
          imageCards={likes.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
          )}
        />
      ),
    },
    {
      tabName: "Collections",
      tabIcon: <CollectionIcon />,
      count: collections.length,
      tabContent: (
        <>
          {collections.map((collection) => (
            <CollectionDetails
              path={`collections/${collection.data().id}/images`}
              collectionDetails={collection.data()}
            />
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
