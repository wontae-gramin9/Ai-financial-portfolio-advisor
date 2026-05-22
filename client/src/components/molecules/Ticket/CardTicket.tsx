import Image from 'next/image'
import { BookableType } from '@/models/bookable'
import type { TicketFrame } from '@/models/ticket'

const CardTicket = (props: { ticketFrame: TicketFrame }) => {
  const { ticketFrame } = props

  const borderColors: { [key in BookableType['type']]: string } = {
    seat: 'border-blue-100',
    meetingroom: 'border-yellow-500',
    rentbox: 'border-teal-100',
    locker: 'border-purple-100',
  }

  const bookableColors: { [key in BookableType['type']]: string } = {
    seat: 'bg-blue-500',
    meetingroom: 'bg-yellow-500',
    rentbox: 'bg-teal-300',
    locker: 'bg-purple-500',
  }

  return (
    <div className="flex flex-row justify-center">
      <div
        className={`flex ${borderColors[ticketFrame.bookableType.type]} w-56 flex-col overflow-hidden rounded-lg border border-solid bg-white-300`}
      >
        <div
          className={`flex ${bookableColors[ticketFrame.bookableType['type']]} flex-row items-center justify-center gap-2 py-2`}
        >
          <h3 className="text-lg font-bold text-white-100">{ticketFrame.name}</h3>
        </div>
        <div className={`flex h-44 w-full flex-col items-center justify-center gap-1 py-4 `}>
          <Image
            src={`/icons/bookable/${ticketFrame.bookableType.type}.png`}
            alt={`${ticketFrame.bookableType.type}`}
            width="48"
            height="48"
          ></Image>
          <p className="font-bold text-black-700">{ticketFrame.bookableType.name}</p>
          <div className="grow"></div>
          <p className="font-bold">유효기간</p>
          <p>{ticketFrame.expires}일</p>
        </div>
        <div className="flex h-20 flex-row items-stretch">
          <div className="flex basis-1/2 flex-col items-center justify-center bg-white-500">
            <p className="font-bold">남은 수량</p>
            <p className="text-center">{ticketFrame.remaining}개</p>
          </div>
          <div className="flex basis-1/2 items-center  justify-center bg-white-700">
            <p className="font-bold">{ticketFrame.purchasePrice}원</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardTicket
