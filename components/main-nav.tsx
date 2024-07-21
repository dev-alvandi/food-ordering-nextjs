"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import ModeToggle from "./mode-toggle";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { UserButton } from "@clerk/nextjs";
import CartActionButton from "./cart-action";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

type NavbarRoutes = {
  href: string;
  label: string;
  active: boolean;
}[];

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  isScrolled: boolean;
  userId: string | null;
}

interface DifferentMediaQueriesNavbarTypes
  extends React.HTMLAttributes<HTMLElement> {
  isScrolled: boolean;
  routes: NavbarRoutes;
  userId: string | null;
}

const MainNav = ({ className, isScrolled, userId, ...props }: MainNavProps) => {
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
      userId={userId}
    />
  ) : (
    <MobileNavbar
      isScrolled={isScrolled}
      routes={routes}
      className={className}
      userId={userId}
    />
  );
};

const DesktopNavbar = ({
  isScrolled,
  className,
  routes,
  userId,
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

        <div className={cn("flex justify-end")}>
          {userId ? (
            <Fragment>
              <div className="flex items-center space-x-4">
                <UserButton afterSignOutUrl="/" />
              </div>

              <CartActionButton />
            </Fragment>
          ) : (
            <div className="flex items-center space-x-2 ml-4 text-black dark:text-white">
              <Link href={"/sign-in"}>
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button className="bg-green-400 text-black hover:bg-green-500">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
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
  const pathname = usePathname();

  useEffect(() => {
    toast.success("🎉 Navigated", {
      id: "changing-route",
    });
  }, [pathname]);

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
          onClick={() =>
            toast.loading("Navigating...", {
              id: "changing-route",
            })
          }
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
  userId,
  ...props
}: DifferentMediaQueriesNavbarTypes) => {
  const [open, setOpen] = useState(false);

  useScrollBehavior(open);

  const pathname = usePathname();

  useEffect(() => {
    toast.success("🎉 Navigated", {
      id: "changing-route",
    });
  }, [pathname]);

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
          <MobileNavbarItems
            routes={routes}
            className="w-full dark:text-white"
            onClick={() => setOpen(false)}
          />
          <div className={cn("flex flex-col items-center py-4")}>
            {userId ? (
              <Fragment>
                <div className="flex z-40 items-center space-x-4 p-4">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonPopoverCard: { pointerEvents: "initial" },
                      },
                    }}
                  />
                </div>

                <CartActionButton />
              </Fragment>
            ) : (
              <div className="flex flex-col items-center gap-3 text-black dark:text-white w-full px-4">
                <Link className="w-full" href={"/sign-in"}>
                  <Button className="w-full" variant="outline">
                    Sign in
                  </Button>
                </Link>
                <Link className="w-full" href={"/sign-up"}>
                  <Button className="w-full bg-green-400 text-black hover:bg-green-500">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
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
  const pathname = usePathname();

  const onLinkClick = (routerHref: string) => {
    if (pathname !== routerHref) {
      toast.loading("Navigating...", {
        id: "changing-route",
      });
    }
    onClick();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 mx-4 ">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-base font-medium transition-colors text-black hover:text-gray-500 hover:dark:text-gray-400 flex items-center justify-center rounded-md py-4 mx-4",
            route.active && "text-hero dark:text-hero",
            className
          )}
          onClick={onLinkClick.bind(null, route.href)}
        >
          {route.label}
        </Link>
      ))}

      <ModeToggle />
    </div>
  );
};

export default MainNav;
