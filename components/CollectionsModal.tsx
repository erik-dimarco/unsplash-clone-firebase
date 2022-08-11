import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { db } from "../firebase";
import {
  query,
  onSnapshot,
  collection,
  doc,
  serverTimestamp,
  addDoc,
  where,
  DocumentData,
  setDoc,
} from "firebase/firestore";

import { useUser } from "@auth0/nextjs-auth0";
import { CardFields } from "./Cards";

type CollectionsModal = {
  show: boolean;
  selectedImage: CardFields;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const CollectionsModal = ({
  show,
  selectedImage,
  setModalOpen,
}: CollectionsModal) => {
  const { user, error, isLoading } = useUser();
  const [selectedCard, setSelectedCard] = useState<CardFields>(selectedImage);
  const [modalPage2, setModalPage2] = useState(false);
  const [nameCharRemaining, setNameCharRemaining] = useState(60);
  const [descriptionCharRemaining, setDescriptionCharRemaining] = useState(250);
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);

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

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const makePrivateRef = useRef<HTMLInputElement>(null);

  const handleCancel = () => {
    setModalPage2(false);
    setNameCharRemaining(60);
    setDescriptionCharRemaining(250);
  };

  const handleCreateCollection = () => {
    setModalPage2(true);
  };

  let divStyle = {
    backgroundImage: "url(" + selectedCard.urls.regular + ")",
    backgroundColor: "#d1d1d1",
    backgroundPosition: "50%",
    backgroundSize: "cover",
  };

  const createCollection = async () => {
    if (loading) return;

    setLoading(true);

    //upload to firebase
    // 1. Create collection
    const collectionRef = collection(db, "collections");
    await setDoc(doc(collectionRef, user?.sub as string), {
      userId: user?.sub,
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      makePrivate: makePrivateRef.current?.checked,
      timestamp: serverTimestamp(),
    });

    // 2. Add images to collection (subcollection)
    await addDoc(collection(collectionRef, user?.sub as string, "images"), {
      name: selectedCard.user.name,
      userProfileImage: selectedCard.user.profile_image.large,
      imageId: selectedCard.id,
      imageURL: selectedCard.urls.regular,
      description: selectedCard.description,
      timestamp: serverTimestamp(),
    });

    setLoading(false);
    setModalPage2(false);
    setModalOpen(false);
  };

  return (
    <Transition show={show} appear as={Fragment}>
      <Dialog
        open={show}
        onClose={() => setModalOpen(false)}
        as="div"
        className="relative z-10"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full min-h-[500px] max-w-4xl transform overflow-hidden rounded-md bg-white shadow-xl transition-all">
                <div className="grid grid-cols-5 text-left">
                  <div style={divStyle} className="col-span-2 h-[500px]"></div>
                  {modalPage2 ? (
                    <div className="mt-6 mx-10 col-span-3">
                      <Dialog.Title
                        as="h1"
                        className="text-3xl font-bold mb-8 text-gray-900"
                      >
                        Create new collection
                      </Dialog.Title>
                      <div className="mt-6">
                        <form onSubmit={createCollection}>
                          <div className="mb-6">
                            <label>
                              Name
                              <div className="relative">
                                <input
                                  ref={nameRef}
                                  className="w-full mt-1 p-3 text-sm leading-tight placeholder:text-gray-400 border border-black rounded-sm shadow-sm"
                                  type="text"
                                  name="Name"
                                  placeholder="Lovely Care Bears"
                                  max="60"
                                  required={true}
                                  onChange={(e) => {
                                    setNameCharRemaining(
                                      60 - e.target.value.length
                                    );
                                  }}
                                />
                                <div className="absolute text-xs right-2 top-[18px] text-gray-400">
                                  {nameCharRemaining}
                                </div>
                              </div>
                            </label>
                          </div>
                          <label>
                            Description
                            <div className="relative">
                              <div className="mt-2 text-sm text-gray-500">
                                (optional)
                              </div>
                              <div>
                                <textarea
                                  ref={descriptionRef}
                                  className="w-full h-24 resize-none mt-1 mb-4 p-3 text-sm leading-tight placeholder-text-gray-500 border border-black rounded-sm 
                                  shadow-sm"
                                  name="Description"
                                  maxLength={250}
                                  inputMode="text"
                                  required={false}
                                  onChange={(e) => {
                                    setDescriptionCharRemaining(
                                      250 - e.target.value.length
                                    );
                                  }}
                                />
                                <div className="absolute text-xs right-2 bottom-[51px] text-gray-400">
                                  {descriptionCharRemaining}
                                </div>
                              </div>
                              <div className="flex mb-6 items-center">
                                <input
                                  ref={makePrivateRef}
                                  type="checkbox"
                                  name="MakePrivate"
                                  className="mr-2"
                                  onChange={(e) => {
                                    e.target.value as unknown as boolean;
                                  }}
                                />
                                <p>Make collection private</p>
                                <LockClosedIcon className="ml-1 h-4 w-4 text-gray-500" />
                              </div>
                            </div>
                          </label>
                          <div className="flex justify-between items-center">
                            <button
                              type="button"
                              className="text-left bg-white px-4 py-6 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                            <div>
                              <button
                                type="button"
                                disabled={loading}
                                className="rounded-md text-left p-3 bg-black text-sm text-white focus:outline-none"
                                onClick={createCollection}
                              >
                                {loading ? "Uploading..." : "Create collection"}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 mx-10 mr-2 pr-2 col-span-3 h-[470px] overflow-y-auto">
                      <div className="sticky top-0 bg-white z-10 inline">
                        <Dialog.Title
                          as="h1"
                          className="text-3xl bg-white font-bold pb-4 text-gray-900"
                        >
                          Add to Collection
                        </Dialog.Title>
                      </div>
                      <div className="mt-1">
                        <button
                          type="button"
                          className="w-full rounded-md text-left border border-gray-400 border-dashed bg-gray-100 px-4 py-6 text-xl font-medium text-gray-500 
                        hover:bg-gray-200 focus:outline-none"
                          onClick={handleCreateCollection}
                        >
                          Create a new collection
                        </button>
                      </div>
                      {collections.map((collection) => (
                        <div className="mt-6 mb-6">
                          {/* <img
                            src={collection.data().image}
                            height="300px"
                            width="300px"
                            alt=""
                          /> */}
                          <button
                            type="button"
                            className="w-full rounded-md text-left border border-gray-400 border-dashed bg-gray-100 px-4 py-6 text-xl font-medium text-gray-500 
                        hover:bg-gray-200 focus:outline-none"
                            onClick={handleCreateCollection}
                          >
                            {collection.data().name}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CollectionsModal;
