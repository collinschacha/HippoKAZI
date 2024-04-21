import Collection from "@/components/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.action";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const page = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const organizedEvents = await getEventsByUser({
    userId: userId,
    page: 1,
  });
  return (
    <>
      <section className="bg-blue-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 ">
        <div className="Wrapper flex items-center justify-center sm:justify-between ">
          <h2 className="h3-bold text-4xl font-bold tracking-tight text-gray-700">
            Ordered Gigs
          </h2>
          <Button asChild className="button hidden sm:flex">
            <Link href="/#gigs" className="">
              Explore More Gigs
            </Link>
          </Button>
        </div>
      </section>

      {/* <section className="wrapper my-8 ">
        <Collection
          data={relatedGigs?.data}
          emptyTitle="No Gigs Found"
          emptyStateSubtext="Order One"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section> */}

      <section className="bg-blue-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 ">
        <div className="Wrapper flex items-center justify-center sm:justify-between ">
          <h2 className="h3-bold text-4xl font-bold tracking-tight text-gray-700">
            Created Gigs
          </h2>
          <Button asChild className="button hidden sm:flex">
            <Link href="/gigs/create" className="">
              Create More Gigs
            </Link>
          </Button>
        </div>
      </section>

      <Collection
        data={organizedEvents?.data}
        emptyTitle="No Gigs Found"
        emptyStateSubtext="Create One"
        collectionType="Events_Organized"
        limit={6}
        page={1}
        urlParamName="eventPage"
        totalPages={2}
      />
    </>
  );
};

export default page;
