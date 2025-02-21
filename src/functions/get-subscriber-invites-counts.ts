import { redis } from '../redis/client'

// Definindo vari�veis que ser�o recebidas da interface
interface GetSubscriberInvitesCountParams {
  subscriberId: string
}

// Fun��o para inserir a inscri��o no bd e retorna seu id
export async function getSubscriberInvitesCount({
  subscriberId,
}: GetSubscriberInvitesCountParams) {
  // Pega quantos convites o usu�rio fez
  const count = await redis.zscore('referral:ranking', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
