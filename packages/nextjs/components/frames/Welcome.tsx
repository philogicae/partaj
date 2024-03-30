"use client";

import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

export default function Welcome() {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex flex-col items-center flex-grow pt-10">
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

        <div className="flex-grow w-full px-8 py-12 mt-16 bg-base-300"></div>
      </div>
    </>
  );
}
