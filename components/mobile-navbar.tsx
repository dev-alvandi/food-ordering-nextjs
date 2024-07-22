import { usePathname, useSearchParams } from "next/navigation";
import { NavbarRoutes } from "./main-nav";
import { Fragment, useEffect } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import CartActionButton from "./cart-action";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ModeToggle from "./mode-toggle";

interface MobileNavbarTypes extends React.HTMLAttributes<HTMLElement> {
  isScrolled: boolean;
  routes: NavbarRoutes;
  userId: string | null;
  openMobileNavbar: boolean;
  setOpenMobileNavbar: (state: boolean) => void;
}

const MobileNavbar = ({
  isScrolled,
  className,
  routes,
  userId,
  openMobileNavbar,
  setOpenMobileNavbar,
  ...props
}: MobileNavbarTypes) => {
  //   const pathname = usePathname();

  //   useEffect(() => {
  //     toast.success("🎉 Navigated", {
  //       id: "changing-route",
  //     });
  //   }, [pathname]);

  return (
    <div className="flex items-center justify-center">
      <Drawer open={openMobileNavbar} onOpenChange={setOpenMobileNavbar}>
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
            onClick={() => setOpenMobileNavbar(false)}
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
    // if (pathname !== routerHref) {
    //   toast.loading("Navigating...", {
    //     id: "changing-route",
    //   });
    // }
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

export default MobileNavbar;
