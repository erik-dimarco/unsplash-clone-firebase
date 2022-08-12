import {
  query,
  collection,
  where,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

type CollectionDetailsProps = {
  path: string;
  collectionDetails: DocumentData;
};

const CollectionDetails = ({
  path,
  collectionDetails,
}: CollectionDetailsProps) => {
  const [images, setImages] = useState<DocumentData[]>();
  useEffect(() => {
    const q = collection(db, path);

    const unsubscribe: DocumentData = onSnapshot(q, (querySnapshot) => {
      setImages(querySnapshot.docs);

      console.log("images", images);

      return unsubscribe;
    });
  }, [db, path]);

  return (
    <div className="p-2">
      <div className="p-2">
        <h2 className="text-xl">{collectionDetails.name}</h2>
        <p className="text-md">{collectionDetails?.description}</p>
      </div>
      <div className="p-2">
        <p>Images</p>
        <p>{collectionDetails?.description}</p>
        <div>
          <p>Image Count: {images?.length}</p>
          {images?.map((image) => (
            <img src={image.data().imageURL} alt={image.data().description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;
