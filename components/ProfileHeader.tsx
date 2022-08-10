import React from "react";
import { PencilIcon } from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/outline";
import { useUser } from "@auth0/nextjs-auth0";

type ProfileHeaderProps = {};

const ProfileHeader = ({}: ProfileHeaderProps) => {
  const { user, error, isLoading } = useUser();
  return (
    <>
      {user && (
        <>
          <div className="flex-shrink-0">
            <img className="rounded-full" src={user.picture as string} />
          </div>
          <div className="flex">
            <div className="flex-col">
              <div className="flex">
                <h1 className="text-4xl font-bold mb-4">{user.name}</h1>
                <div>
                  <div className="flex flex-shrink-0 ml-6 items-center rounded-md space-x-2 p-2 border-gray-300 border text-gray-600 text-sm hover:text-gray-800 hover:border-gray-800 cursor-pointer">
                    <PencilIcon className="h-4 w-4" />
                    <button className="">Edit Profile</button>
                  </div>
                </div>
              </div>
              <div className="flex-col items-center justify-center text-sm text-gray-700">
                <p className="text-sm mb-4">{`Download free, beautiful high-quality photos curated by ${
                  String(user.name).split(" ")[0]
                }.`}</p>
                <div className="flex items-center space-x-2 text-gray-500">
                  <XCircleIcon className="h-4 w-4" />
                  <p>Not available for hire</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileHeader;
