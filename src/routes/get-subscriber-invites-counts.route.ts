import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-counts'

// Cadastrar inscrições
export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          // Descrição do que faz a rota
          summary: 'Get subscriber invites count',
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

        const { count } = await getSubscriberInvitesCount({ subscriberId })

        return { count }
      }
    )
  }
