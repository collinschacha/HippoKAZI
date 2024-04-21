"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { formSchema } from "@/lib/validator";
import Dropdown from "./Dropdown";
import { Textarea } from "./ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.action";

type GigFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: any;
  eventId?: string;
};

const GigForm = ({ userId, type, event, eventId }: GigFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const initialValues =
    event && type === "Update"
      ? event
      : {
          title: "",
          description: "",
          location: "",
          imageUrl: "",
          categoryId: "",
          price: "",
        };

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const eventData = values;
    let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId: userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          router.push(`/gigs/${newEvent._id}`);
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          userId: userId,
          path: `/gigs/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/gigs/${updatedEvent._id}`);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 "
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <Input
                    placeholder="Gig Title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full ]">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row ">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <div>
                    <Input
                      placeholder="Gig Location: Physical or Remote"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row ">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <div>
                    <Input
                      type="number"
                      placeholder="Price(USD)"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting" : `${type} Gig`}
        </Button>
      </form>
    </Form>
  );
};

export default GigForm;
