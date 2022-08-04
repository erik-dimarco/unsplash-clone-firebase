import { PlusIcon } from "@heroicons/react/outline";
import React from "react";

type DownloadButtonProps = {};

const DownloadButton = ({}: DownloadButtonProps) => {
  return (
    <div className="bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
      <PlusIcon className="h-5 w-5 text-gray-600" />
    </div>
  );
};

export default DownloadButton;
