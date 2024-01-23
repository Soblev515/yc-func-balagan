import {z} from 'zod';

export const RequestParams = z.object({
  login: z.string(),
  password: z.string(),
  name: z.string().optional()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
