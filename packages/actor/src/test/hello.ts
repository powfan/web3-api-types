import { publicProcedure, router } from '@actor/trpc'
import { z } from 'zod'

export const helloInputSchema = z.object({
  name: z.string().default('World').describe('名字'),
})

export const helloOutputSchema = z.object({
  greeting: z.string().describe('问候语'),
})

export const helloRouter = router({
  hello: publicProcedure
    .input(helloInputSchema)
    .output(helloOutputSchema)
    .query(({ input }) => {
      return { greeting: `Hello, ${input.name}!` }
    }),
})
