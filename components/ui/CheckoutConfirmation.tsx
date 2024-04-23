"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createOrder } from "@/lib/actions/order.action";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type CheoutConfirmParams = {
  gig: any;
};

const CheckoutConfirmation = ({ gig }: CheoutConfirmParams) => {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <CheckCircle width={20} height={20} /> Order
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to order?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will place an order with the gig creator so please make be
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await createOrder(gig);
                router.push("/profile");
              })
            }
          >
            {isPending ? "Ordering..." : "Order"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CheckoutConfirmation;
