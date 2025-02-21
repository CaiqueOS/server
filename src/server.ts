import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link.route'
import { getRankingRoute } from './routes/get-ranking.route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks.route'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-counts.route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position.route'
import { subscribeToEventRoute } from './routes/subscribe-to-event.route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Serializar
app.setSerializerCompiler(serializerCompiler)

//Validar
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors) // Se deixar true, qualquer front end vai poder acessar, mas em produção é melhor deixar o ip correto

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

// Definindo rota da documentação
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// Rota para cadastrar inscrições
app.register(subscribeToEventRoute)

// Rota de acesso ao link de invite
app.register(accessInviteLinkRoute)

// Rota para pegar a quantidade de clicks no link
app.register(getSubscriberInviteClicksRoute)

// Rota para pegar a quantidade de inscrições recebidas pelo usuário
app.register(getSubscriberInvitesCountRoute)

// Rota para pegar a posição do usuário no ranking
app.register(getSubscriberRankingPositionRoute)

// Rota para pegar o ranking
app.register(getRankingRoute)

// Quando acessar a rota /hello, vai mostrar 'Hello World'
app.get('/hello', () => {
  return 'Hello world!'
})

// Quando o servidor estiver rodando, vai dar o log
app.listen({ port: env.PORT }).then(() => {
  console.log('Server running!')
})
