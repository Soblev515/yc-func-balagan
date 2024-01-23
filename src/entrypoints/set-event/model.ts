import {z} from 'zod';

export const RequestParams = z.object({
  name: z.string(),
  description: z.string(),
  place: z.string(),
  date: z.string(),
  time: z.string(),
  url: z.string().optional(),
  price: z.number(),
  tags: z.array(z.string())
});

export type RequestParamsType = z.infer<typeof RequestParams>;
