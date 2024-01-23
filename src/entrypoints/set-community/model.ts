import {z} from 'zod';

export const RequestParams = z.object({
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()), 
  visible: z.boolean()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
