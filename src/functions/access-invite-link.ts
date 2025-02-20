import { redis } from '../redis/client'

// Definindo variáveis que serão recebidas da interface
interface AccessInviteLink {
  subscriberId: string
}

// Função para inserir a inscrição no bd e retorna seu id
export async function accessInviteLink({ subscriberId }: AccessInviteLink) {
  // Cria o objeto 'access-count', em que a chave vai ser o Id do usuário, e incrementa ele em 1
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
