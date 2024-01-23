import {z} from 'zod';

export const RequestParams = z.object({
  event_id: z.string(),
  number: z.string(),
  is_found: z.boolean(),
  is_profile: z.boolean()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
