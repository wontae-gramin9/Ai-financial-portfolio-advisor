import Link from 'next/link'
import { getUserIdAfterCheckAuthRedirect } from '@/actions/authjs'
import { getUserActivatedBoookable } from '@/actions/booth'
import { nipoutUserTicket } from '@/actions/userticket'
import BookableCard from '@/components/molecules/BookableCard'
import Button from '@/components/molecules/Button/Button'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'
import { Bookable } from '@/models/bookable'

export default async function NipoutPage() {
  const userId = await getUserIdAfterCheckAuthRedirect()
  const userActivatedBookableList = await getUserActivatedBoookable(userId, ['seat', 'meetingroom'])
  return (
    <div className="flex flex-col gap-2">
      <Title text="외출" />
      {userActivatedBookableList.length ? (
        <div className="flex flex-col gap-2">
          <SubTitle text="현재 이용중인 예약의 외출버튼을 누르면 30분간 외출할 수 있으며 전원은 연결되지 않습니다." />
          <SubTitle text="사용시간은 자동으로 연장됩니다." />
          <SubTitle text="이용중인 예약" bold={true} />
          {userActivatedBookableList.map((activatedBookable: Bookable) => {
            const nipoutUserTicketByTicketId = nipoutUserTicket.bind(null, userId, activatedBookable.ticketId!)
            return (
              <div key={activatedBookable.id} className="flex flex-row items-center justify-center gap-2">
                <BookableCard bookable={activatedBookable} />
                <form action={nipoutUserTicketByTicketId}>
                  <Button form={true}>외출</Button>
                </form>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center  gap-2">
          <p>현재 사용중인 좌석이 없어 외출할수 없습니다.</p>
          <Link href="/">
            <Button>홈으로 돌아기기</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
