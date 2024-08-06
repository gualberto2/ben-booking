"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { useRouter } from "next/navigation";

const CreateBooking = () => {
  const router = useRouter();
  return (
    <section className="">
      <div className="flex flex-row justify-between items-center">
        <Heading title="Booking" description="Manage your bookings here." />
        <Button onClick={() => router.push(`/dashboard/book/new`)}>New</Button>
      </div>
    </section>
  );
};
export default CreateBooking;
