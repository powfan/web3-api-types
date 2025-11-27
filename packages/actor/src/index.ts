import { helloRouter } from '@actor/test/hello'
import { router } from '@actor/trpc'

export const appRouter = router({
  hello: helloRouter,
})

export { fetchRequestHandler } from '@trpc/server/adapters/fetch'
export type AppRouter = typeof appRouter
