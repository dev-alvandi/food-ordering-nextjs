"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import ModeToggle from "./mode-toggle";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  isScrolled: boolean;
}

const MainNav = ({ className, isScrolled, ...props }: MainNavProps) => {
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

  return (
    <div className="ml-auto">
      <nav
        className={cn(
          "flex items-center space-x-4 lg:space-x-12 pl-6",
          className
        )}
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-base font-medium transition-colors hover:text-primary",
              route.active
                ? isScrolled
                  ? "text-hero font-bold"
                  : "text-black dark:text-white"
                : isScrolled
                ? "text-black dark:text-white"
                : "text-white dark:text-black"
            )}
          >
            {route.label}
          </Link>
        ))}
        <ModeToggle />
      </nav>
    </div>
  );
};

export default MainNav;
