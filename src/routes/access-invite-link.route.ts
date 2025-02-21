import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'

// Cadastrar inscrições
export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        // Descrição do que faz a rota
        summary: 'Access invite link and redirects user.',
        tags: ['referral'],
        // Texto maior para descrição
        description: '',
        // Validando os dados com o Zod
        params: z.object({
          subscriberId: z.string(), // Colocando .optional() ele vai entender que não é obrigatório
        }),
        // Setando o que vai ser mostrado na resposta do status 201
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      //request: Conteúdo da requisição
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      const redirectUrl = new URL(env.WEB_URL)

      // Para saber qual usuário enviou o invite, vai passar o id do usuário como parâmetro
      redirectUrl.searchParams.set('referrer', subscriberId)

      // 301: redirect permanente (salva cache)
      // 302: redirect temporário

      // reply: Resposta
      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
