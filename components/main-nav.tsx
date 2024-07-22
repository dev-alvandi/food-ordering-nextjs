"use client";

import { useParams, usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";

export type NavbarRoutes = {
  href: string;
  label: string;
  active: boolean;
}[];

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  isScrolled: boolean;
  userId: string | null;
}

const MainNav = ({ className, isScrolled, userId, ...props }: MainNavProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [openMobileNavbar, setOpenMobileNavbar] = useState(false);

  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === `/`,
    },
    {
      href: "/menu",
      label: "Menu",
      active: pathname === `/menu`,
    },
    {
      href: "/orders",
      label: "Orders",
      active: pathname === `/orders`,
    },
    {
      href: "/about",
      label: "About",
      active: pathname === `/about`,
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === `/contact`,
    },
  ];

  return isDesktop ? (
    <DesktopNavbar
      isScrolled={isScrolled}
      routes={routes}
      className={className}
      userId={userId}
    />
  ) : (
    <MobileNavbar
      isScrolled={isScrolled}
      routes={routes}
      className={className}
      userId={userId}
      openMobileNavbar={openMobileNavbar}
      setOpenMobileNavbar={setOpenMobileNavbar}
    />
  );
};

export default MainNav;
