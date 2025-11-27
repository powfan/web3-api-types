import { appRouter, fetchRequestHandler } from '@dex-cex/actor'

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    return fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: () => ({ env }),
    })
  },
}

