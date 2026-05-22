// import { BookableType } from "@/models/bookable"
// import { TicketFrame } from "@/models/ticket"

export type UserCoupon = {
  expiresAt: string // "2024-04-11 12:24:12"
  id: string
  issuedAt: string // "2024-04-04 12:24:12"
  type: CouponFrame
  userId: string //
}

export type CouponFrame = {
  expires: number // 4일
  statement: string // "할인"
  name: string // "리뷰감사 10%할인권"
  number: number // 10
  // targetId: string // ticketId
  // target: [
  //   {
  //     name: TicketFrame["name"]
  //     bookableType: BookableType
  //   },
  // ]
  type: 'timebonus' | 'sale' | 'discount'
}
