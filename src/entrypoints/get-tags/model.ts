import {z} from 'zod';

export const RequestParams = z.object({
  limit: z.number(),
  offset: z.number()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
