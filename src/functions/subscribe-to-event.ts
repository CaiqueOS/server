import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'

// Definindo variáveis que serão recebidas da interface
interface SubscribeToEventParams {
  name: string
  email: string
}

// Função para inserir a inscrição no bd e retorna seu id
export async function subscribeToEvent({
  name,
  email,
}: SubscribeToEventParams) {
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  const subscriber = result[0]

  return {
    subscriberId: subscriber.id,
  }
}
