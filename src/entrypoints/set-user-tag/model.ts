import {z} from 'zod';

export const RequestParams = z.object({
  tags: z.array(z.string())
});

export type RequestParamsType = z.infer<typeof RequestParams>;
