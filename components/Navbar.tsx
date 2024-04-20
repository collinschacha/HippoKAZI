import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { buttonVariants } from "./ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between ">
        <Link href="/" className="w-36">
          <Icons.logo className="h-10 w-10" />
        </Link>

        <SignedIn>
          <nav className="md:flex-between  hidden w-full max-w-xs justify-center">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex justify-end gap-3">
          <SignedOut>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "ghost" })}
            >
              Sign In
            </Link>

            <span className="h-6 w-px bg-gray-200" />

            <Link
              href="/sign-up"
              className={buttonVariants({ variant: "ghost" })}
            >
              Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
