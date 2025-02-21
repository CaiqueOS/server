import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-counts'

// Cadastrar inscri��es
export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          // Descri��o do que faz a rota
          summary: 'Get subscriber invites count',
          tags: ['referral'],
          // Texto maior para descri��o
          description: '',
          // Validando os dados com o Zod
          params: z.object({
            subscriberId: z.string(), // Colocando .optional() ele vai entender que n�o � obrigat�rio
          }),
          // Setando o que vai ser mostrado na resposta do status 201
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        //request: Conte�do da requisi��o
        const { subscriberId } = request.params

        const { count } = await getSubscriberInvitesCount({ subscriberId })

        return { count }
      }
    )
  }
