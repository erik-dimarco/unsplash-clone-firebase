import { useUser } from "@auth0/nextjs-auth0";
import React, { useEffect, useState } from "react";

import { CardFields } from "./Cards";
import DownloadButton from "./DownloadButton";
import HeartButton from "./HeartButton";
import PlusButton from "./PlusButton";
import CollectionsModal from "./CollectionsModal";
import {
  query,
  collection,
  where,
  DocumentData,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import AlertsModal from "./AlertsModal";

type CardProps = {
  card: CardFields;
};

function Card({ card }: CardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<CardFields>();
  const [liked, setLiked] = useState<boolean>(false);
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [alertsModalOpen, setAlertsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "likes"),
        where("likedByUserId", "==", user.sub)
      );
      const unsubscribe: DocumentData = onSnapshot(q, (querySnapshot) => {
        setLiked(
          querySnapshot.docs.some((doc) => doc.data().imageId === card.id)
        );

        return unsubscribe;
      });
    }
  }, [db, user]);

  const handlePlusClick = () => {
    if (user) {
      setModalOpen(true);
      console.log("modalOpen", modalOpen);
      setSelectedImage(card);
      console.log("selectedImage", selectedImage);
    } else {
      setAlertsModalOpen(true);
    }
  };

  const handleHeartClick = async () => {
    if (user) {
      if (loading) return;

      setLoading(true);

      if (!liked) {
        const documentId = user?.sub + "-" + card.id;
        //upload to firebase
        await setDoc(doc(db, "likes", documentId), {
          likedByUserId: user?.sub,
          name: card.user.name,
          userProfileImage: card.user.profile_image.large,
          imageId: card.id,
          imageURL: card.urls.regular,
          description: card.description,
          timestamp: serverTimestamp(),
        });
        setLiked(true);
      } else {
        //delete from firebase
        await deleteDoc(doc(db, "likes", user?.sub + "-" + card.id));
        setLiked(false);
      }

      setLoading(false);
    } else {
      setAlertsModalOpen(true);
    }
  };

  return (
    <div key={card.id} className="group relative">
      {selectedImage && (
        <CollectionsModal
          show={modalOpen}
          setModalOpen={setModalOpen}
          selectedImage={selectedImage as CardFields}
        />
      )}
      <AlertsModal
        show={alertsModalOpen}
        setAlertsModalOpen={setAlertsModalOpen}
      />
      <div className="">
        <img
          src={card.urls?.regular}
          className="mb-8 cursor-zoom-in hover:brightness-75 transition-all ease-in-out duration-100"
        />
        <div className="invisible group-hover:visible absolute top-6 right-6 transition-all ease-in-out duration-100">
          <div className="flex items-center space-x-2">
            <div onClick={handleHeartClick}>
              <HeartButton liked={liked} />
            </div>
            <div onClick={handlePlusClick}>
              <PlusButton />
            </div>
          </div>
        </div>
        <div className="invisible group-hover:visible absolute bottom-6 left-6 transition-all ease-in-out duration-100">
          <div className="flex items-center justify-between">
            <img
              className="h-9 w-9 bg-white rounded-full mr-2"
              src={card.user?.profile_image.large}
            />
            <div className="flex-col">
              <p className="text-white text-md">{card.user?.name}</p>
              {card.description && (
                <p className="text-white text-xs truncate w-60">
                  {card.description}
                </p>
              )}
            </div>
          </div>
        </div>
        <a
          rel="nofollow"
          download=""
          target="_blank"
          title="Download photo"
          href={
            "https://unsplash.com/photos/" + card.id + "/download?force=true"
          }
          className="mx-4 absolute bottom-6 right-2 invisible group-hover:visible transition-all ease-in-out duration-100"
        >
          <DownloadButton />
        </a>
      </div>
    </div>
  );
}

export default Card;
