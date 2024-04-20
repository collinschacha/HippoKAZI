import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be atleast 3 characters")
    .max(50, "Title too long"),
  description: z
    .string()
    .min(3, "Description must be atleast 3 characters")
    .max(500, "Description too long"),
  location: z
    .string()
    .min(1, "Location name too short")
    .max(10, "Location name too long"),
  imageUrl: z.string(),
  categoryId: z.string(),
  price: z.string(),
  url: z.string().url(),
});
