import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'

// Definindo vari�veis que ser�o recebidas da interface
interface SubscribeToEventParams {
  name: string
  email: string
}

// Fun��o para inserir a inscri��o no bd e retorna seu id
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
