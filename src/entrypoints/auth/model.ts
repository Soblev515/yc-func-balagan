import {z} from 'zod';

export const RequestParams = z.object({
  login: z.string(),
  password: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
