import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'

import { createGoalRoute } from './routes/create-goal'
import { createcompletionRoute } from './routes/create-completion'
import { getPendingRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createcompletionRoute)
app.register(getPendingRoute)
app.register(getWeekSummaryRoute)

const port = 3336
app
  .listen({
    port,
  })
  .then(() => {
    console.log('http server running in port:', port)
  })