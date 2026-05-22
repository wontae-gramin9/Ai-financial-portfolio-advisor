export type Order = {
  userId: string
  cardId: string | null
  ticketId: string
  couponId: string | null
}

export const order1: Order = {
  userId: 'userId',
  cardId: 'cardId',
  ticketId: 'ticketId',
  couponId: 'couponId',
}
