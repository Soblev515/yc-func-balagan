import {z} from 'zod';

export const RequestParams = z.object({
  community_id: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
