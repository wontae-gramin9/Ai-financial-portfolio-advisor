import { Bookable } from '@/models/bookable'

function BookableCard(props: { bookable: Bookable }) {
  const { bookable } = props
  return (
    <div className="flex flex-row justify-center gap-4 overflow-hidden rounded-lg border border-solid bg-white-500 p-2">
      <div className="font-bold">
        <p>예약</p>
        <p>{bookable.bookableType.name}타입</p>
        <p>{bookable.bookableType.name}번호</p>
      </div>
      <div>
        <p>{bookable.bookableType.name}</p>
        <p>{bookable.seat.name}</p>
        <p>{bookable.seat.number}</p>
      </div>
    </div>
  )
}

export default BookableCard
