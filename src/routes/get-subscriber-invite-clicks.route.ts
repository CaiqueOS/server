import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'

// Cadastrar inscri��es
export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/clicks',
      {
        schema: {
          // Descri��o do que faz a rota
          summary: 'Get subscriber invite clicks count',
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

        const { count } = await getSubscriberInviteClicks({ subscriberId })

        return { count }
      }
    )
  }
