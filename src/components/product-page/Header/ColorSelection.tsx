"use client";

import {
  Color,
  setColorSelection,
} from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

interface ColorSelectionProps {
  "product-colors"?: Color[];
}

const ColorSelection = ({ "product-colors": productColors }: ColorSelectionProps) => {
  const { colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();

  // If no colors are provided, don't render the component
  if (!productColors || productColors.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        Select Colors
      </span>
      <div className="flex items-center flex-wrap space-x-3 sm:space-x-4">
        {productColors.map((color: Color, index: number) => (
            <button
            key={index}
            type="button"
            style={{ backgroundColor: color.code, border: "2px solid black" }}
            className="rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center"
            onClick={() => dispatch(setColorSelection(color))}
            >
            {colorSelection.name === color.name && (
              <IoMdCheckmark
              className={`text-base ${color.name.toLowerCase() === "white" ? "text-black" : "text-white"}`}
              />
            )}
            </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;
