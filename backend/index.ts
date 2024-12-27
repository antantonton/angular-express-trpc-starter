import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import { z } from 'zod'
import { initTRPC } from '@trpc/server'
import { SERVER_PORT } from 'common/environment'

// created for each request
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}) // no context
type Context = Awaited<ReturnType<typeof createContext>>

export const t = initTRPC.context<Context>().create()
export type AppRouter = typeof appRouter

const appRouter = t.router({
  hello: t.procedure.query((opts) => {
    console.log('hello query')
    return 'Hello from trpc query procedure'
  }),
})

const app = express()
app.use(cors())

// Add trpc middleware
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
)

app.get('/', (req, res) => {
  console.log('express app root get')
  res.send('Hello from api-server')
})

app.listen(SERVER_PORT, () => {
  console.log(`api-server listening at http://localhost:${SERVER_PORT}`)
})
