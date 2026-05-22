export type Bookable = {
  id: string
  seat: SeatType
  ticketId: string | null
  userId: string | null
  bookableType: BookableType
}

export type BookableType = {
  name: '좌석' | '회의실' | '대여함' | '사물함'
  type: 'seat' | 'meetingroom' | 'rentbox' | 'locker'
}

export type SeatType = {
  number: string
  type: string
  name: string
}
