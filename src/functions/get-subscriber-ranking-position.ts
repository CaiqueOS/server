import { redis } from '../redis/client'

// Definindo variáveis que serão recebidas da interface
interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

// Função para inserir a inscrição no bd e retorna seu id
export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionParams) {
  // Pega a posição do usuário
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
}
