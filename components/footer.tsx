import Container from "@/components/container";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="">
      <Container className="w-full">
        <div className="w-full bg-hero/30 grid grid-cols-2 md:grid-cols-4 px-4 md:px-12 py-8">
          <div className="flex flex-col items-start justify-start gap-3">
            <h2 className="text-3xl font-semibold">Menu</h2>
            <p className="text-neutral-500 dark:text-neutral-100 text-sm">
              Home
            </p>
            <p className="text-neutral-500 dark:text-neutral-100 text-sm">
              Why Choose
            </p>
            <p className="text-neutral-500 dark:text-neutral-100 text-sm">
              Special Menu
            </p>
            <p className="text-neutral-500 dark:text-neutral-100 text-sm">
              Regular Food
            </p>
            <p className="text-neutral-500 dark:text-neutral-100 text-sm">
              Special Chefs
            </p>
          </div>

          <div className="flex flex-col items-start justify-start gap-3">
            <h2 className="text-3xl font-semibold">Help</h2>
            <p className="text-neutral-500 dark:text-neutral-100 text-sm">
              Privacy
            </p>
            <p className="text-neutral-500 dark:text-neutral-100 text-sm">
              Terms & Condition
            </p>
            <p className="text-neutral-500 dark:text-neutral-100 text-sm">
              Policy
            </p>
          </div>

          <div className="flex flex-col items-start justify-start gap-3">
            <h2 className="text-3xl font-semibold">Contact</h2>
            <p className="text-neutral-500 dark:text-neutral-100 text-sm">
              +46 000 00 00 00
            </p>
            <p className="text-neutral-500 dark:text-neutral-100 text-sm">
              info@{process.env.NEXT_PUBLIC_APP_NAME}.se
            </p>
            <p className="text-neutral-500 dark:text-neutral-100 text-sm">
              Östra Rönneholmsvägen 20, 211 47 Malmö
            </p>
          </div>

          <div className="flex flex-col items-start justify-start gap-3">
            <h2 className="text-3xl font-semibold dark:text-neutral-100">
              Subscribe Our Newsletter
            </h2>
            <div className="w-full rounded-md border-2 border-emerald-500 dark:text-neutral-100 flex items-center justify-center">
              <input
                type="text"
                placeholder="Enter your Email"
                className="h-full bg-transparent pl-4 text-sm text-neutral-500 dark:text-neutral-100 dark:placeholder:text-neutral-100 w-full outline-none border-none"
              />
              <Button className="bg-emerald-500 dark:text-neutral-100 rounded-tr-none rounded-br-none hover:bg-emerald-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto py-8 ">
          <p className="text-center text-xs text-neutral-600 dark:text-neutral-200">
            &copy; 2024&nbsp;
            <span className="capitalize">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </span>
            , Inc. All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
