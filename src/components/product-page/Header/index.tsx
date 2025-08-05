import React from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import ColorSelection from "./ColorSelection";
import SizeSelection from "./SizeSelection";
import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import OrderModal from "../OrderModal";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/hooks/useTranslation";

const Header = ({ data }: { data: Product }) => {
  const t = useTranslation();
  const { colorSelection, sizeSelection } = useAppSelector(
    (state: RootState) => state.products
  );
   console.log("Current selections:", {
    color: colorSelection,
    size: sizeSelection
  });
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <PhotoSection data={data} />
        </div>
        <div>
          <h1
            className={cn([
              integralCF.className,
              "text-2xl md:text-[40px] md:leading-[40px] mb-3 md:mb-3.5",
            ])}
            style={{ textTransform: 'none' }}
          >
            {data.title}
          </h1>
          <div className="flex items-center mb-3 sm:mb-3.5">
            <Rating
              initialValue={data.rating}
              allowFraction
              SVGclassName="inline-block"
              emptyClassName="fill-gray-50"
              size={25}
              readonly
            />
            <span className="text-black text-xs sm:text-sm ml-[11px] sm:ml-[13px] pb-0.5 sm:pb-0">
              {data.rating.toFixed(1)}
              <span className="text-black/60">/5</span>
            </span>
          </div>
          <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
            {data.discount.percentage > 0 ? (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                {`$${Math.round(
                  data.price - (data.price * data.discount.percentage) / 100
                )}`}
              </span>
            ) : data.discount.amount > 0 ? (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                {`$${data.price - data.discount.amount}`}
              </span>
            ) : (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}
            {data.discount.percentage > 0 && (
              <span className="font-bold text-black/40 line-through text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}
            {data.discount.amount > 0 && (
              <span className="font-bold text-black/40 line-through text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}
            {data.discount.percentage > 0 ? (
              <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-${data.discount.percentage}%`}
              </span>
            ) : (
              data.discount.amount > 0 && (
                <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                  {`-$${data.discount.amount}`}
                </span>
              )
            )}
          </div>
          <p className="text-sm sm:text-base text-black/60 mb-5">
           {data.description || "No description available for this product."}
          </p>
          <hr className="h-[1px] border-t-black/10 mb-5" />
          {data.colors && data.colors.length > 0 && (
            <>
            <ColorSelection product-colors={data.colors} />
          <hr className="h-[1px] border-t-black/10 my-5" />
            </>
          )}
          {data.sizes && data.sizes.length > 0 && (
            <>
          <SizeSelection product-sizes={data.sizes} />
          <hr className="hidden md:block h-[1px] border-t-black/10 my-5" />
           </>
          )}
          
          {/* Order Now Button */}
          <div className="mt-6 space-y-3">
            {/* Urgency Text */}
            <div className="text-center">
              <p className="text-sm text-orange-600 font-medium animate-pulse">
                🔥 {data.discount.percentage > 0 || data.discount.amount > 0 ? "Limited Time Offer!" : "Order Now - Fast Delivery!"}
              </p>
            </div>
            
            <OrderModal product={data}>
              <Button 
                className="w-full relative overflow-hidden group bg-gradient-to-r from-black via-gray-900 to-black text-white hover:from-gray-900 hover:via-black hover:to-gray-900 py-4 text-lg font-bold tracking-wide transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] border-2 border-transparent hover:border-orange-500/30"
                size="lg"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shimmer transition-opacity duration-500"></div>
                
                {/* Button Content */}
                <div className="relative flex items-center justify-center space-x-2">
                  <span className="text-xl">🛒</span>
                  <span className="group-hover:scale-110 transition-transform duration-200">
                    {t?.order?.orderNow || "ORDER NOW"}
                  </span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">⚡</span>
                </div>
                
                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-md border-2 border-orange-500/50 opacity-0 group-hover:opacity-100 animate-ping"></div>
              </Button>
            </OrderModal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
