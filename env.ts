import { z } from "zod";

const envSchema = z.object({
  KEY_SECRET: z.string().min(1),
});

export const env = "SECRET TOKEN";
