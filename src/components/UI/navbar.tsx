"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
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

export const Navbar = () => {
  const { user } = useUser();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NextLink className="flex justify-start items-center gap-1" href="/">
        <p className="font-bold text-inherit">NextGenTechTips</p>
      </NextLink>
      <NavbarContent justify="center" className="basis-1/5 sm:basis-full">
        <NavbarBrand as="li" className="gap-3 max-w-fit"></NavbarBrand>
        <ul className="hidden lg:flex gap-4 lg:justify-center lg:items-center ml-2">
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

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <CreatePostModal />
        </NavbarItem>

        {user?.email ? (
          <NavbarItem className="hidden sm:flex gap-2">
            <NavbarAvatar />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden md:flex">
            <Link href={"/login"}>
              {" "}
              <Button>Login</Button>
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};
