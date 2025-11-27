import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { env } from 'cloudflare:workers'
import type { AppRouter } from '@actor/index'

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'https://internal/trpc',
      fetch: (url, options) => env.SELF.fetch(url, options),
    }),
  ],
})
