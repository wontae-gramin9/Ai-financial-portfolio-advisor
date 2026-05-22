import Link from 'next/link'
import { getUserIdAfterCheckAuthRedirect } from '@/actions/authjs'
import { getBoookableById, getUserActivatedBoookable } from '@/actions/booth'
import BookableCard from '@/components/molecules/BookableCard'
import Button from '@/components/molecules/Button/Button'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'

export default async function BookablePage({ params }: { params: { id: string } }) {
  const { id } = params // QR코드에서 들어옴
  const userId = await getUserIdAfterCheckAuthRedirect()
  const currentBookable = await getBoookableById(id)
  const [userActivatedBookable] = await getUserActivatedBoookable(userId, [currentBookable.bookableType.type])
  return (
    <div className="flex flex-col items-center justify-center">
      <Title text={`${currentBookable.bookableType.name} QR코드`} />
      {currentBookable.ticketId ? (
        <SubTitle bold={true} text="이미 사용되고 있는 자리입니다." />
      ) : userActivatedBookable ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <p>현재 사용중인 {currentBookable.bookableType.name}이 있습니다.</p>
          <div key={userActivatedBookable.id}>
            <BookableCard bookable={userActivatedBookable} />
          </div>
          {['seat', 'meetingroom'].includes(currentBookable.bookableType.type) ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <p>새로운 {currentBookable.bookableType.name}으로 이동하시겠습니까?</p>
              <BookableCard bookable={currentBookable} />
              <Link href={`/change/move/?id=${id}`}>
                <Button> {currentBookable.bookableType.name}이동</Button>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <SubTitle
            text={`현재 ${currentBookable.bookableType.name}은 비어있습니다. 티켓을 사용하시면 좌석을 사용할 수 있습니다.`}
          />
          <SubTitle text="티켓을 사용하시겠습니까?" />
          <Link href={`/user/ticket/inventory/${currentBookable.bookableType.type}?bookableId=${id}`}>
            <Button>티켓사용</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
