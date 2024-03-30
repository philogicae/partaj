"use client";

import React, { useRef, useState } from "react";
import { ArchiveBoxArrowDownIcon, ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";

type DragAndDropProps = {
  filetype?: string;
  onChange?: (image?: File) => void;
};

export default function DragAndDrop({ filetype = ".zip", onChange }: DragAndDropProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>("");
  const [file, setFile] = useState<any>("");

  function handleChange(e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (filetype === ".zip") {
        onChange && onChange(e.target.files[0]);
      }
    }
  }
  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }
  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }
  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      if (filetype === ".zip") {
        onChange && onChange(e.target.files[0]);
      }
    }
  }
  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }
  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }
  function removeFile() {
    setFile(null);
    onChange && onChange();
  }

  return (
    <div
      className={`${
        dragActive ? "bg-gray-900" : "bg-gray-800"
      } p-2 w-full rounded-lg text-sm text-center flex flex-col items-center justify-center border-dashed border border-gray-200`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <input
        placeholder="fileInput"
        className="hidden"
        ref={inputRef}
        type="file"
        multiple={false}
        onChange={handleChange}
        accept=".zip,.rar,.7z"
      />
      <div
        className="flex flex-col items-center justify-center w-full py-1 text-gray-500 cursor-pointer"
        onClick={openFileExplorer}
      >
        <div className="pb-1 text-lg">
          <ArrowUpTrayIcon />
        </div>
        <span className="text-xl text-white">drag & drop or click to upload</span>
      </div>
      <div className="flex flex-col items-center w-full text-white">
        <div className="flex flex-row items-center justify-between w-full p-1 mt-2 border border-gray-600 rounded">
          <div className="flex flex-row items-center justify-center">
            <ArchiveBoxArrowDownIcon className="text-lg" />
            <span className="ml-2">{file.name}</span>
          </div>
          <div className="text-red-500 cursor-pointer" onClick={() => removeFile()}>
            <TrashIcon className="text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
