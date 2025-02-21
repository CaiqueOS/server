import { redis } from '../redis/client'

// Definindo variáveis que serão recebidas da interface
interface GetSubscriberInvitesCountParams {
  subscriberId: string
}

// Função para inserir a inscrição no bd e retorna seu id
export async function getSubscriberInvitesCount({
  subscriberId,
}: GetSubscriberInvitesCountParams) {
  // Pega quantos convites o usuário fez
  const count = await redis.zscore('referral:ranking', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
