import { BookableType } from '@/models/bookable'

// @서버 Ticket
// 사용중인 것은 used flag로
export type UserTicket = {
  ticketType: TicketFrame
  expiresAt: string // 유효기간 만료기간  "2024-03-29 12:53:53"
  endsAt: string // 기간권일 경우 남은 기간 "2024-04-05 22:39:07"
  availableTime: string // 시간권일 경우 남은 시간 "82:48:30"
  id: string
  refund: number // 환불 받을 수 있는 금액
  userId: string
  used: boolean
}

// @서버 TicketType
export type TicketFrame = {
  bookableType: BookableType
  name: string // "10시간 시간권"
  remaining: number // 2
  purchasePrice: number // 5000
  expires: number // @서버 유효기간 7일. 일수로 받아오는 것
  id: string
  number: number // 10
  limit: number // 10
  typeName: string
  type: 'oneday' | 'period' | 'time' | 'discount' | 'billing'
}
