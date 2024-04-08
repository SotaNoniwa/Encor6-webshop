"use client";

import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectColor: React.FC<SelectColorProps> = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addImageToState({ ...item, imageFile: value });
  }, []);

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);

    if (!e.target.checked) {
      setFile(null);
      removeImageFromState(item);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-300 items-center p-2">
      <div className="flex flex-row gap-2 items-center h-[40px]">
        <input
          id={item.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
        <div
          className="w-[18px] h-[18px] rounded-full border border-black"
          style={{ backgroundColor: item.colorCode }}
        ></div>
      </div>
      <>
        {isSelected && !file && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {file && (
          <div className="flex flex-col gap-2 text-sm col-span-2 items-start justify-between">
            <p>{file.name}</p>
            <div className="w-full">
              <Button
                label="キャンセル"
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                }}
                custom="font-semibold"
                small
                outline
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default SelectColor;
