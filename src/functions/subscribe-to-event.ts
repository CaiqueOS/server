import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

// Definindo variáveis que serão recebidas da interface
interface SubscribeToEventParams {
  name: string
  email: string
  referrerId?: string | null
}

// Função para inserir a inscrição no bd e retorna seu id
export async function subscribeToEvent({
  name,
  email,
  referrerId,
}: SubscribeToEventParams) {
  // Caso o usuário que está se cadastrando já tenha o e-mail cadastrado
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))

  if (subscribers.length > 0) {
    return { subscriberId: subscribers[0].id }
  }

  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  const subscriber = result[0]

  if (referrerId) {
    await redis.zincrby('referral:ranking', 1, referrerId)
  }

  return {
    subscriberId: subscriber.id,
  }
}
