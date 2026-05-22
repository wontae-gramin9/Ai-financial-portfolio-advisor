import Image from 'next/image'
import { BookableType } from '@/models/bookable'
import type { TicketFrame } from '@/models/ticket'

const StretchedTicket = (props: { ticketFrame: TicketFrame }) => {
  const { ticketFrame } = props

  const borderColors: { [key in BookableType['type']]: string } = {
    seat: 'border-blue-100',
    meetingroom: 'border-yellow-500',
    rentbox: 'border-teal-100',
    locker: 'border-purple-100',
  }

  const bookableColors: { [key in BookableType['type']]: string } = {
    seat: 'bg-blue-700',
    meetingroom: 'bg-yellow-700',
    rentbox: 'bg-teal-500',
    locker: 'bg-purple-700',
  }

  return (
    <div
      className={`flex ${borderColors[ticketFrame.bookableType.type]} flex-row rounded-lg border border-solid bg-white-300`}
    >
      <div
        className={`flex ${bookableColors[ticketFrame.bookableType.type]} size-20 flex-col items-center justify-center gap-1 rounded-l-lg`}
      >
        <Image
          src={`/icons/bookable/${ticketFrame.bookableType.type}.png`}
          alt={`${ticketFrame.type}`}
          width="24"
          height="24"
        ></Image>
        <p className="text-white-100">{ticketFrame.bookableType.name}</p>
      </div>
      <div className="flex grow flex-row justify-between pl-1">
        <div className="flex flex-col justify-center">
          <p className="font-bold">{ticketFrame.name}</p>
        </div>
        <div className="flex items-center gap-1">
          <div>
            <p className="font-bold">남은 수량</p>
            <p className="text-center">{ticketFrame.remaining}개</p>
          </div>
          <div className="flex size-20 flex-col items-center justify-center rounded-r-lg bg-white-700">
            <p className="font-bold text-black-700">{ticketFrame.purchasePrice}원</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StretchedTicket
