import { HeartIcon } from "@heroicons/react/solid";
import React, { Dispatch, SetStateAction } from "react";

type HeartButtonProps = {};

const HeartButtom = ({}: HeartButtonProps) => {
  return (
    <div className="bg-red-600 px-3 py-2 rounded-md cursor-pointer">
      <HeartIcon className="h-5 w-5 text-white" />
    </div>
  );
};

export default HeartButtom;
