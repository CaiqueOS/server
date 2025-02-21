import { redis } from '../redis/client'

// Definindo vari�veis que ser�o recebidas da interface
interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

// Fun��o para inserir a inscri��o no bd e retorna seu id
export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionParams) {
  // Pega a posi��o do usu�rio
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
}
