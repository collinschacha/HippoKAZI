import { formatPrice } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { ArrowBigLeft, EditIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type CardProps = {
  gig: any;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ gig, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isGigCrreator = userId === gig.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/gigs/${gig._id}`}
        style={{ backgroundImage: `url(${gig.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
      />
      {/* is gig creater */}
      {isGigCrreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4  rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/gigs/create/${gig._id}/update`}>
            <EditIcon width={20} height={20} />
          </Link>
        </div>
      )}

      <Link
        href={`/gigs/${gig._id}`}
        className="flex min-h-[240px] flex-col gap-3 p-5 md:gap-4"
      >
        {!hidePrice && (
          <div className="flex gap-2 ">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-500 text-center">
              {formatPrice(gig.price)}
            </span>
            <p className="p-semibold-14 rounded-full w-min bg-gray-500/10 px-4 py-1 text-gray-500">
              {gig.category.name}
            </p>
          </div>
        )}

        <p className="p-bold text-gray-600 text-2xl font-bold">{gig.title}</p>

        <div className="flex-between w-full  ">
          <p className="p-medium-14 md:p-medium-16   text-gray-700 p-bold text-lg font-bold">
            by {gig.organizer.firstName} {gig.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?eventId={gig._id}`} className="flex gap-2 ">
              <p className="text-blue-500">Order details:</p>
              <ArrowBigLeft />
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;
