"use client";

import { cn } from "@/lib/utils";
import Container from "./container";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import MainNav from "./main-nav";
import { Fragment, useEffect, useState } from "react";
import ModeToggle from "./mode-toggle";
import CartActionButton from "./cart-action";
import { useMediaQuery } from "@/hooks/use-media-query";

interface HeaderProps {
  userId: string | null;
}

const Header = ({ userId }: HeaderProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isPageScrolled = window.scrollY > 1;
      setIsScrolled(isPageScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition bg-transparent",
        isScrolled && "left-0 top-0 bg-white dark:bg-black shadow-lg"
      )}
    >
      <Container>
        <div
          className={cn(
            "h-16 px-4 sm:p-6 lg:px-12 flex items-center",
            !isDesktop && "grid grid-cols-3 grid-rows-1"
          )}
        >
          <Link
            href={"/"}
            className="text-lg uppercase flex gap-x-2 font-bold text-neutral-700 dark:text-white md:text-xl justify-start items-center"
          >
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Link>

          {/* Main nav bar */}
          <MainNav className="justify-center" isScrolled={isScrolled} />

          <div className={cn("flex justify-end")}>
            <ModeToggle />
            {userId ? (
              <Fragment>
                <div className="ml-4 flex items-center space-x-4">
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
        </div>
      </Container>
    </header>
  );
};

export default Header;
