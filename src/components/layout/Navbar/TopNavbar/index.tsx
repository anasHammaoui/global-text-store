import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";

const data: NavMenu = [
  {
    id: 1,
    type: "MenuItem",
    label: "T-Shirts",
    url: "/shop?category=t-shirt",
    children: [],
  },
  {
    id: 2,
    type: "MenuItem",
    label: "Jeans",
    url: "/shop?category=jeans",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "Shirts",
    url: "/shop?category=shirt",
    children: [],
  },
];

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start px-4 xl:px-0">
        <div className="flex items-center">
            <Link
            href="/"
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
      </div>
    </nav>
  );
};

export default TopNavbar;
