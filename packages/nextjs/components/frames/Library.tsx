"use client";

import { ArrowLeftIcon, NoSymbolIcon } from "@heroicons/react/24/outline";

export default function Library() {
  return (
    <div className="absolute flex flex-col items-center w-full h-full manual-y-center">
      <NoSymbolIcon className="w-20 h-20 mb-6 text-2xl" />
      <span className="mb-6 text-2xl font-bold">404 Not Found</span>
      <a href={window.location.origin + "/#/"}>
        <div className="flex flex-row items-center justify-center text-sm">
          <ArrowLeftIcon className="text-white" />
          <span className="pl-2">MENU</span>
        </div>
      </a>
    </div>
  );
}
