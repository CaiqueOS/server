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

// Quando acessar a rota /hello, vai mostrar 'Hello World'
app.get('/hello', () => {
  return 'Hello world!'
})

// Quando o servidor estiver rodando, vai dar o log
app.listen({ port: env.PORT }).then(() => {
  console.log('Server running!')
})
