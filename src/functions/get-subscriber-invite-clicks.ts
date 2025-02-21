import { redis } from '../redis/client'

// Definindo variáveis que serão recebidas da interface
interface GetSubscriberInviteClicksParams {
  subscriberId: string
}

// Função para inserir a inscrição no bd e retorna seu id
export async function getSubscriberInviteClicks({
  subscriberId,
}: GetSubscriberInviteClicksParams) {
  // Pega quantos acessos o id teve no link
  const count = await redis.hget('referral:access-count', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
