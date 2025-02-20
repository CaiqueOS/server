import { redis } from '../redis/client'

// Definindo vari�veis que ser�o recebidas da interface
interface AccessInviteLink {
  subscriberId: string
}

// Fun��o para inserir a inscri��o no bd e retorna seu id
export async function accessInviteLink({ subscriberId }: AccessInviteLink) {
  // Cria o objeto 'access-count', em que a chave vai ser o Id do usu�rio, e incrementa ele em 1
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
