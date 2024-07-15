"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import ModeToggle from "./mode-toggle";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Fragment, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import useScrollBehavior from "@/hooks/use-scroll-behavior";

type NavbarRoutes = {
  href: string;
  label: string;
  active: boolean;
}[];

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  isScrolled: boolean;
}

interface DifferentMediaQueriesNavbarTypes
  extends React.HTMLAttributes<HTMLElement> {
  isScrolled: boolean;
  routes: NavbarRoutes;
}

const MainNav = ({ className, isScrolled, ...props }: MainNavProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
    />
  ) : (
    <MobileNavbar
      isScrolled={isScrolled}
      routes={routes}
      className={className}
    />
  );
};

const DesktopNavbar = ({
  isScrolled,
  className,
  routes,
  ...props
}: DifferentMediaQueriesNavbarTypes) => {
  return (
    <div className="ml-auto">
      <nav
        className={cn(
          "flex items-center space-x-4 lg:space-x-12 pl-6",
          className
        )}
      >
        <DesktopNavbarItems routes={routes} isScrolled={isScrolled} />
      </nav>
    </div>
  );
};

const DesktopNavbarItems = ({
  routes,
  isScrolled,
  className,
}: {
  routes: NavbarRoutes;
  isScrolled: boolean;
  className?: string;
}) => {
  return (
    <Fragment>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-base font-medium transition-colors hover:text-primary hover:dark:text-gray-100",
            route.active
              ? isScrolled
                ? "text-hero font-bold"
                : "text-black dark:text-white"
              : isScrolled
              ? "text-black dark:text-white"
              : "text-white dark:text-black",
            className
          )}
        >
          {route.label}
        </Link>
      ))}
      <ModeToggle />
    </Fragment>
  );
};

const MobileNavbar = ({
  isScrolled,
  className,
  routes,
  ...props
}: DifferentMediaQueriesNavbarTypes) => {
  const [open, setOpen] = useState(false);

  useScrollBehavior(open);

  return (
    <div className="flex items-center justify-center">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex flex-col items-center justify-between gap-3 mb-4">
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription>Navigate through manu items</DrawerDescription>
          </DrawerHeader>
          <div className="w-full">
            <MobileNavbarItems
              routes={routes}
              className="w-full dark:text-white"
              onClick={() => setOpen(false)}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const MobileNavbarItems = ({
  routes,
  onClick,
  className,
}: {
  routes: NavbarRoutes;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 mx-4 ">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          onClick={onClick}
          className={cn(
            "text-base font-medium transition-colors text-black hover:text-gray-500 hover:dark:text-gray-400 flex items-center justify-center rounded-md py-4 mx-4",
            route.active && "text-hero dark:text-hero",
            className
          )}
        >
          {route.label}
        </Link>
      ))}

      <ModeToggle />
    </div>
  );
};

export default MainNav;
