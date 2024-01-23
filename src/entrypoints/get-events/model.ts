import {z} from 'zod';

export const RequestParams = z.object({
  is_me: z.boolean(),
  is_favorite: z.boolean(),
  limit: z.number(),
  offset: z.number()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
