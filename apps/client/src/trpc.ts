import { createTRPCReact } from '@trpc/react-query';
import type { SaintsRouter } from 'api-server';
import type { inferRouterOutputs } from '@trpc/server';

export type RouterOutput = inferRouterOutputs<SaintsRouter>;
export type GetReadings = RouterOutput['getReadings'];
export const trpc = createTRPCReact<SaintsRouter>();
