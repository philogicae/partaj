/* "use client";

import React, { useRef, useState } from "react";
import { Image } from "@nextui-org/react";
import { FileType, getAcceptedExt, getFileType, getIcon } from "@utils/filetypes";
import { ClassName, cn } from "@utils/tw";
import { FaRegTrashCan, FaUpload, FaXmark } from "react-icons/fa6";

const shortener = (str: string) =>
  str.length > 24 ? str.substring(0, 14) + "..." + str.substring(str.length - 8, str.length) : str;

type DragAndDropProps = {
  className?: ClassName;
  multiple?: boolean;
  filetype?: FileType;
  onChange?: (image?: File) => void;
};

export default function DragAndDrop({
  className,
  multiple = true,
  filetype = FileType.ANY,
  onChange,
}: DragAndDropProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);

  function handleChange(e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      if (multiple) {
        for (let i = 0; i < e.target.files["length"]; i++) {
          setFiles((prevState: any) => [...prevState, e.target.files[i]]);
        }
      } else {
        setFiles([e.target.files[0]]);
        if (filetype === FileType.IMAGE) {
          onChange && onChange(e.target.files[0]);
        }
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
      if (multiple) {
        for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
          setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
        }
      } else {
        setFiles([e.dataTransfer.files[0]]);
        if (filetype === FileType.IMAGE) {
          onChange && onChange(e.target.files[0]);
        }
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
  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
    if (filetype === FileType.IMAGE && newArr.length === 0) {
      onChange && onChange();
    }
  }

  return (
    <div
      className={cn(
        `${
          dragActive ? "bg-gray-900" : "bg-gray-950"
        }  p-2 w-full rounded-lg text-sm text-center flex flex-col items-center justify-center border-dashed border border-gray-500`,
        className,
      )}
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
        multiple={multiple}
        onChange={handleChange}
        accept={getAcceptedExt(filetype)}
      />
      <div
        className="flex flex-col items-center justify-center w-full py-1 text-gray-500 cursor-pointer"
        onClick={openFileExplorer}
      >
        <div className="pb-1 text-lg">
          <FaUpload />
        </div>
        {"drag & drop or click to upload"}
      </div>
      <div
        className={`flex items-center w-full text-white ${
          filetype !== FileType.IMAGE ? "flex-col" : "flex-wrap items-center justify-center"
        }`}
      >
        {files.map((file: any, idx: any) =>
          filetype !== FileType.IMAGE ? (
            <div
              key={idx}
              className="flex flex-row items-center justify-between w-full p-1 mt-2 border border-gray-600 rounded"
            >
              <div className="flex flex-row items-center justify-center">
                <div />
                {React.createElement(getIcon(getFileType(file.name)), {
                  className: "text-lg",
                })}
                <span className="ml-2">{shortener(file.name)}</span>
              </div>
              <div className="text-red-500 cursor-pointer" onClick={() => removeFile(file.name, idx)}>
                <FaRegTrashCan className="text-lg" />
              </div>
            </div>
          ) : multiple ? (
            <div
              key={idx}
              className="w-16 h-16 flex border border-gray-600 m-0.5 mt-2 rounded-lg relative justify-end overflow-hidden"
            >
              <Image alt="Preview" src={URL.createObjectURL(file)} width={64} height={64} radius="none" />
              <div
                className="absolute z-10 text-red-500 bg-gray-800 rounded cursor-pointer"
                onClick={() => removeFile(file.name, idx)}
              >
                <FaXmark />
              </div>
            </div>
          ) : (
            <div
              key={idx}
              className="flex border border-gray-600 m-0.5 mt-2 rounded-lg relative justify-end overflow-hidden w-1/2"
            >
              <Image alt="Preview" src={URL.createObjectURL(file)} radius="none" />
              <div
                className="absolute z-10 w-5 h-5 text-red-500 bg-gray-800 rounded cursor-pointer"
                onClick={() => removeFile(file.name, idx)}
              >
                <FaXmark className="text-xl" />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
 */
