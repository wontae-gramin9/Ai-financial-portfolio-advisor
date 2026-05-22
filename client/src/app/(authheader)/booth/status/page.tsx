import { getAllBookable } from '@/actions/booth'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'
import { Bookable } from '@/models/bookable'

function getBoothStatus(bookables: Bookable[]): {
  occupiedBoothStatus: Map<string, number[]>
  vacantBoothStatus: Map<string, number[]>
} {
  const occupiedBoothStatus = new Map<string, number[]>()
  const vacantBoothStatus = new Map<string, number[]>()

  bookables.forEach((seat) => {
    const typeName = seat.bookableType.name
    const seatNumber = seat.seat.number
    const seatName = seat.seat.name
    const key = `${typeName} - ${seatName}`

    if (seat.ticketId !== null) {
      if (!occupiedBoothStatus.has(key)) {
        occupiedBoothStatus.set(key, [])
      }
      occupiedBoothStatus.get(key)!.push(Number(seatNumber))
    } else {
      if (!vacantBoothStatus.has(key)) {
        vacantBoothStatus.set(key, [])
      }
      vacantBoothStatus.get(key)!.push(Number(seatNumber))
    }
  })

  return { occupiedBoothStatus, vacantBoothStatus }
}

export default async function BoothStatusPage() {
  const allBookableList = await getAllBookable()
  const { occupiedBoothStatus, vacantBoothStatus } = getBoothStatus(allBookableList)
  return (
    <div className="flex flex-col gap-2">
      <Title text="궁극의 창작공간 사용현황" />
      <SubTitle text="사용중인 예약과 사용가능한 예약의 번호" />
      <div className="m-auto flex flex-col gap-2 overflow-hidden rounded-lg border border-solid bg-white-300 p-2">
        <div>
          <p className="font-bold">사용 중</p>
          {[...occupiedBoothStatus.entries()].map(([typeName, numbers]) =>
            numbers.map((number) => (
              <div key={number}>
                {typeName}: {number}번
              </div>
            )),
          )}
        </div>
        <div>
          <p className="font-bold">사용 가능</p>
          {[...vacantBoothStatus.entries()].map(([typeName, numbers]) =>
            numbers.map((number) => (
              <div key={number}>
                {typeName}: {number}번
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  )
}
