import { HeartIcon } from "@heroicons/react/solid";
import React, { Dispatch, SetStateAction } from "react";

type HeartButtonProps = {
  liked: boolean;
};

const HeartButtom = ({ liked }: HeartButtonProps) => {
  return (
    <>
      {liked ? (
        <div className="bg-red-600 px-3 py-2 rounded-md cursor-pointer">
          <HeartIcon className="h-5 w-5 text-white" />
        </div>
      ) : (
        <div className="bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
          <HeartIcon className="h-5 w-5 text-gray-600" />
        </div>
      )}
    </>
  );
};

export default HeartButtom;
