import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'

// Cadastrar inscrições
export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/clicks',
      {
        schema: {
          // Descrição do que faz a rota
          summary: 'Get subscriber invite clicks count',
          tags: ['referral'],
          // Texto maior para descrição
          description: '',
          // Validando os dados com o Zod
          params: z.object({
            subscriberId: z.string(), // Colocando .optional() ele vai entender que não é obrigatório
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
        //request: Conteúdo da requisição
        const { subscriberId } = request.params

        const { count } = await getSubscriberInviteClicks({ subscriberId })

        return { count }
      }
    )
  }
