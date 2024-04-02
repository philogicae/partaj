"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import DragAndDrop from "~~/components/DragAndDrop";
import { Address } from "~~/components/scaffold-eth";

export default function Welcome() {
  const { address: connectedAddress } = useAccount();
  const [title, setTitle] = useState("");
  //const [file, setFile] = useState(null);
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // handle form submission here
  };
  return (
    <div className="flex flex-col items-center flex-grow w-full h-full pt-10">
      <div className="px-5">
        <h1 className="text-center">
          <span className="block mb-2 text-4xl font-bold">Partaj</span>
          <span className="block text-2xl">Decentralize your website instantly</span>
        </h1>
        <div className="flex items-center justify-center space-x-2">
          <p className="my-2 font-medium">Connected Address:</p>
          <Address address={connectedAddress} />
        </div>
        <p className="text-lg text-center"></p>
      </div>
      <span className="p-3 text-2xl italic">Ready very soon 👀</span>
      <form
        className="flex flex-col items-center justify-between w-1/2 h-full p-10 bg-base-300"
        onSubmit={handleSubmit}
      >
        <input
          className="px-3 py-2 mb-10 rounded-md"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Website Name"
        />
        <DragAndDrop />
        <button type="submit" className="mt-10">
          Submit
        </button>
      </form>
    </div>
  );
}
