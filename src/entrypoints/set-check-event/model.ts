import {z} from 'zod';

export const RequestParams = z.object({
  event_id: z.string(),
  status: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
