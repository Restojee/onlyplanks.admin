import { GetInstance } from '@common/instances/types';

export type AsyncActionFabric<Req, S > = (
  request: Req,
  store: S,
  options: AsyncOptions
) => Promise<void>

export type AsyncAction<Req> = (req: Req) => void

export interface AsyncOptions {
  getInstance?: GetInstance
}