import { inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

export async function getRanking() {
  // Pegando os 3 primeiros do ranking com o valor de cada uma
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')
  const subscriberIdAndScore: Record<string, number> = {}

  // Salvando o ranking em um objeto
  // zrevrange retorna os dados dessa maneira:
  // [ id, valorDoId, id2, valorDoId2 ] sendo um array
  for (let i = 0; i < ranking.length; i += 2) {
    // objeto[id] = valorDoId
    subscriberIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
  }

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscriberIdAndScore)))

  const rankingWithScore = subscribers
    .map(subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscriberIdAndScore[subscriber.id],
      }
    })
    // Como está pegando os dados do banco, não está mais ordenado, então precisa reordenar
    // sub2.score - sub1.score = ordenando de forma decrescente
    // sub1.score - sub2.score = ordenando de forma crescente
    .sort((sub1, sub2) => {
      return sub2.score - sub1.score
    })

  return { rankingWithScore }
}
