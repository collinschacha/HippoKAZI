import { getEventById } from "@/lib/actions/event.action";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { MapIcon } from "lucide-react";

const GigDetails = async ({ params: { id } }: SearchParamProps) => {
  const gig = await getEventById(id);

  return (
    <section className="flex justify-center bg-gray-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={gig.imageUrl}
          alt="Gig image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h3-bold text-4xl font-bold tracking-tight text-gray-700">
              {gig.title}
            </h2>

            <div className="flex flex-col gap-3  sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {" "}
                  {formatPrice(gig.price)}
                </p>
                <p className="p-medium-16 rounded-full bg-gray-500/10 px-4 py-2.5 text-gray-500">
                  {gig.category.name}
                </p>
              </div>
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0 font-bold tracking-tight text-gray-600">
                by{" "}
                <span>
                  {gig.organizer.firstName} {gig.organizer.lastName}
                </span>
              </p>
            </div>
          </div>
          {/* checkout button */}

          <div className="flex flex-col gap-5 ">
            <div className="flex gap-2 md:gap-3 ">
              <p className="rounded-full bg-gray-500/10 px-4 py-2.5 text-gray-500 flex gap-1">
                {<MapIcon />}
                {gig.location}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="p-bold text-gray-600 text-lg font-bold">
              Gig Details :
            </p>
            <p className=" text-gray-500">{gig.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GigDetails;
