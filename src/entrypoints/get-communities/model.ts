import {z} from 'zod';

export const RequestParams = z.object({
  only_me: z.boolean(),
  limit: z.number(),
  offset: z.number()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
