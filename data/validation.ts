import { z } from "zod";

export const TestimonialsSchema = z.object({
  name: z.string(),
  email: z.string().email().min(3),
  message: z.string().min(3).max(200),
});
