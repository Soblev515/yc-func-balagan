import {z} from 'zod';

export const RequestParams = z.object({
  user_id: z.string().optional(),
});

export type RequestParamsType = z.infer<typeof RequestParams>;
