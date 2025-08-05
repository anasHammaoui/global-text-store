"use client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useTranslation } from "@/lib/hooks/useTranslation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TopNavbar = () => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = params.locale as string;
  const t = useTranslation();

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    const newUrl = `/${newLocale}${currentPath}`;
    // Navigate to new locale and refresh
    window.location.href = newUrl;
  };

  const data: NavMenu = [
    {
      id: 1,
      type: "MenuItem",
      label: t?.links?.tShirt || "T-Shirts",
      url: `/${locale}/shop?category=t-shirt`,
      children: [],
    },
    {
      id: 2,
      type: "MenuItem",
      label: t?.links?.jeans || "Jeans",
      url: `/${locale}/shop?category=jeans`,
      children: [],
    },
    {
      id: 3,
      type: "MenuItem",
      label: t?.links?.shirts || "Shirts",
      url: `/${locale}/shop?category=shirt`,
      children: [],
    },
  ];
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start px-4 xl:px-0">
        <div className="flex items-center">
            <Link
            href={`/${locale}`}
            className={cn([
              "flex items-center py-2 mb-2 mr-3 lg:mr-10",
            ])}
            >
            <img
              src="/logo.png"
              alt="SHOP.CO Logo"
              className="h-8 w-auto lg:h-14"
            />
            </Link>
        </div>
        <NavigationMenu className="hidden md:flex ml-auto mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* Language Selector */}
        <div className="flex items-center">
          <Select value={locale} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-fit border-none shadow-none bg-transparent text-sm font-medium">
              <SelectValue>
                {locale === 'en' ? '🇺🇸 EN' : '🇫🇷 FR'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇺🇸 English</SelectItem>
              <SelectItem value="fr">🇫🇷 Français</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
