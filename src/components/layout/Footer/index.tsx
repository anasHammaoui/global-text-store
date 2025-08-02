"use client";
import { useTranslation } from "@/lib/hooks/useTranslation";
import React from "react";

const Footer = () => {
    const t = useTranslation();

  return (
    <footer className="mt-10">
      <div className="bg-[#F0F0F0] px-4 py-6">
        <div className="max-w-frame mx-auto">
          <div className="flex justify-center items-center">
            <p className="text-sm text-center text-black/60">
              {t?.copyright || "© 2025 Shop.co. All rights reserved."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
