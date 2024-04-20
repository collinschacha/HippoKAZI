import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description: "Get your Gigs worked on immeadiately with no wait times",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description:
      "Every worker on our platform is verified by our team to ensure high quality standards.  Not Happy? We offer a 30-day refund guarantee ",
  },
  {
    name: "For The Planet",
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-600 sm:text-6xl ">
            Your Source of high-quality{" "}
            <span className="text-blue-600">digital workers</span>.
          </h1>

          <p className="mt-6  text-lg max-w-prose text-muted-foreground">
            Welcome to HippoKAZI. Every worker on our platform is verified by
            our team to ensure highest quality
          </p>
          <div className="flex flex-col sm:flex-row  gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant={"ghost"}>Our Quality Promise &rarr;</Button>
          </div>
        </div>

        {/* lsit products */}
      </MaxWidthWrapper>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="font-semibold  tracking-tight text-gray-600 md:font-bold text-3xl ">
          Trusted by <br /> <span className="text-blue-600">Thousands</span> of
          companies
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          search category
        </div>
      </section>

      <section className="border-t border-gray-200 bg-gray-50 bg-dotted-pattern">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => {
              return (
                <div
                  key={perk.name}
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                >
                  <div className=" md:flex-shrink-0 flex justify-center">
                    <div className=" h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                      {<perk.Icon className=" w-1/3 h-1/3" />}
                    </div>
                  </div>
                  <div className=" mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-base font-medium text-gray-900">
                      {perk.name}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {perk.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </section>
      <Footer />
    </>
  );
}
