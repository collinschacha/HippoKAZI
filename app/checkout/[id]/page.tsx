import CheckoutConfirmation from "@/components/ui/CheckoutConfirmation";
import { Button } from "@/components/ui/button";
import { getEventById } from "@/lib/actions/event.action";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

type CheckOutProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: CheckOutProps) => {
  const gig = await getEventById(id);

  return (
    <div className="flex items-center justify-center flex-col gap-3 mt-3 text-start">
      <h1 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-6x">
        CheckOut
      </h1>
      <h2 className="text-xl font-bold tracking-tight text-gray-600 sm:text-6x">
        Order ID: {id}
      </h2>
      <p className="text-lg font-bold tracking-tight text-start text-gray-500 sm:text-6x">
        Gig Title: {gig.title} <br />
        Gig Details: {gig.description} <br />
        Gig Organizer {gig.organizer.firstName} {gig.organizer.firstName}
      </p>

      <CheckoutConfirmation gig={gig} />
    </div>
  );
};

export default page;
