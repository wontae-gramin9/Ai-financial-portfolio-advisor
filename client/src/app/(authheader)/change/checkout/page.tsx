import Link from 'next/link'
import { getUserIdAfterCheckAuthRedirect } from '@/actions/authjs'
import { getUserActivatedBoookable } from '@/actions/booth'
import { checkoutUserTicket } from '@/actions/userticket'
import BookableCard from '@/components/molecules/BookableCard'
import Button from '@/components/molecules/Button/Button'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'
import { Bookable } from '@/models/bookable'

export default async function CheckoutPage() {
  const userId = await getUserIdAfterCheckAuthRedirect()
  const userActivatedBookableList = await getUserActivatedBoookable(userId, ['seat', 'meetingroom'])
  return (
    <div className="flex flex-col gap-2">
      <Title text="퇴실" />
      {userActivatedBookableList.length ? (
        <div className="flex flex-col gap-2">
          <SubTitle text="현재 이용중인 예약의 퇴실버튼을 누르면 퇴실됩니다." />
          <SubTitle text="이용중인 예약" bold={true} />
          {userActivatedBookableList.map((activatedBookable: Bookable) => {
            const checkoutUserTicketByTicketId = checkoutUserTicket.bind(null, userId, activatedBookable.ticketId!)
            return (
              <div key={activatedBookable.id} className="flex flex-row items-center justify-center gap-2">
                <BookableCard bookable={activatedBookable} />
                <form action={checkoutUserTicketByTicketId}>
                  <Button form={true}>퇴실</Button>
                </form>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col  items-center justify-center  gap-2">
          <p>현재 사용중인 좌석이 없어 퇴실할수 없습니다.</p>
          <Link href="/">
            <Button>홈으로 돌아기기</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
