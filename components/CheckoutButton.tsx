"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

const CheckoutButton = ({ event }: { event: any }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const notrender = userId === event.organizer._id;
  if (notrender) {
    return null;
  }
  return (
    <div className="flex items-center gap-3 ">
      <SignedOut>
        <Button asChild>
          <Link href={`/sign-in`}>Sign In To Order</Link>
        </Button>
      </SignedOut>

      <SignedIn>
        <Button asChild>
          <Link href={`/checkout/${event._id}`}>Click To Order</Link>
        </Button>
      </SignedIn>
    </div>
  );
};

export default CheckoutButton;
