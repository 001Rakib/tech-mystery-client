"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";

import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import Link from "next/link";
import { useUser } from "@/src/context/user.provider";
import NavbarAvatar from "./NavbarAvatar";
import CreatePostModal from "../modules/Home/CreatePostModal";
import { Spinner } from "@nextui-org/spinner";
import { useState } from "react";

export const Navbar = () => {
  const { user, isLoading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NextLink className="flex justify-start items-center gap-1" href="/">
        <p className="font-bold text-inherit">NextGenTechTips</p>
      </NextLink>
      {/* for large device */}
      <NavbarContent justify="center" className="basis-1/5 sm:basis-full">
        <ul className="hidden md:flex md:gap-4 md:justify-center md:items-center ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
      {/* for large device */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {user ? <CreatePostModal /> : "Login to Create Post"}
        </NavbarItem>

        {user?.email ? (
          <NavbarItem className="hidden sm:flex gap-2">
            <NavbarAvatar />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden md:flex">
            <Link href={"/login"}>
              {" "}
              {isLoading ? <Spinner size="sm" /> : <Button>Login</Button>}
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* mobile device */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden sm:flex"
        />
      </NavbarContent>
      <NavbarContent justify="end">
        {user?.email ? (
          <NavbarItem className="flex md:hidden gap-2">
            <NavbarAvatar />
          </NavbarItem>
        ) : (
          <NavbarItem className="flex md:hidden">
            <Link href={"/login"}>
              {" "}
              {isLoading ? <Spinner size="sm" /> : <Button>Login</Button>}
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        <NavbarItem className="flex md:hidden">
          {user ? <CreatePostModal /> : "Login to Create Post"}
        </NavbarItem>
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
};
