import {z} from 'zod';

export const RequestParams = z.object({
  event_id: z.number(),
});

export type RequestParamsType = z.infer<typeof RequestParams>;
