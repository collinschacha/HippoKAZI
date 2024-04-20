import GigForm from "@/components/GigForm";
import { auth } from "@clerk/nextjs";

const page = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-gray-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center text-4xl font-bold tracking-tight text-gray-600 ">
          Create Gig
        </h3>
      </section>
      <div className="wrapper my-8 ">
        <GigForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default page;
