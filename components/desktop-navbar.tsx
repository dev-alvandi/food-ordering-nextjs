import { cn } from "@/lib/utils";
import { NavbarRoutes } from "./main-nav";
import { Fragment, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import CartActionButton from "./cart-action";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ModeToggle from "./mode-toggle";
import { usePathname } from "next/navigation";

interface DesktopNavbarTypes extends React.HTMLAttributes<HTMLElement> {
  isScrolled: boolean;
  routes: NavbarRoutes;
  userId: string | null;
}

const DesktopNavbar = ({
  isScrolled,
  className,
  routes,
  userId,
  ...props
}: DesktopNavbarTypes) => {
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
                <UserButton afterSignOutUrl="/sign-in" />
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

  // useEffect(() => {
  //   window.addEventListener("", () => {})
  //   toast.success("🎉 Navigated", {
  //     id: "changing-route",
  //   });
  // }, [pathname]);

  const onLickClick = () => {
    // toast.loading("Navigating...", {
    //   id: "changing-route",
    // })
  };

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
          onClick={onLickClick}
        >
          {route.label}
        </Link>
      ))}
      <ModeToggle />
    </Fragment>
  );
};

export default DesktopNavbar;
