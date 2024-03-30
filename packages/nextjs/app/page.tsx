"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RouterProvider, createHashRouter, redirect } from "react-router-dom";
import Error from "~~/components/frames/Error";
import Library from "~~/components/frames/Library";
import Loading from "~~/components/frames/Loading";
import Welcome from "~~/components/frames/Welcome";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (window.location.pathname + window.location.hash === "/") router.replace("/#/");
  }, []);
  const hashRouter = createHashRouter([
    { path: "", element: <Welcome /> },
    { path: "library", element: <Library /> },
    { path: "404", element: <Error /> },
    { path: "*", loader: async () => redirect("404") },
  ]);
  return <RouterProvider router={hashRouter} fallbackElement={<Loading />} future={{ v7_startTransition: true }} />;
}
