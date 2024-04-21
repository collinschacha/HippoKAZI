import GigForm from "@/components/GigForm";
import { getEventById } from "@/lib/actions/event.action";
import { UpdateEventParams } from "@/types";
import { auth } from "@clerk/nextjs";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const gig = await getEventById(id);
  return (
    <>
      <section className="bg-gray-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center text-4xl font-bold tracking-tight text-gray-600 ">
          Update Gig
        </h3>
      </section>
      <div className="wrapper my-8 ">
        <GigForm userId={userId} type="Update" event={gig} eventId={gig._id} />
      </div>
    </>
  );
};

export default page;
