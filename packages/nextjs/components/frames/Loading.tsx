"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="absolute flex flex-col items-center w-full h-full manual-y-center">
      <ArrowPathIcon className="w-20 h-20 mb-6 text-2xl animate-spin" />
      <div className="flex flex-row items-center">
        <span className="font-sans text-3xl">Partaj</span>
      </div>
    </div>
  );
}
