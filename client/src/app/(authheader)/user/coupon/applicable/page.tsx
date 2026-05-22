import { headers } from 'next/headers'
import Link from 'next/link'
import { getUserIdAfterCheckAuthRedirect } from '@/actions/authjs'
import { getTicketFrameById } from '@/actions/ticketframe'
import { getApplicableUserCouponByTicketId } from '@/actions/usercoupon'
import BottomSheetButton from '@/components/molecules/Button/BottomSheetButton'
import BottomSheetModal from '@/components/molecules/Modal/BottomSheetModal'
import StretchedTicket from '@/components/molecules/Ticket/StretchedTicket'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'
import BorderCardContainer from '@/components/organisms/BorderCardContainer'
import StretchedUserCoupon from '@/components/organisms/StretchedUserCoupon'
import { UserCoupon } from '@/models/coupon'
import { TicketFrame } from '@/models/ticket'

export default async function ApplicableUserCouponPage() {
  const urlObject = new URL(headers().get('x-url')!)
  const selectedTicketId = urlObject.searchParams.get('ticketId') ?? 'ticketIdError'
  const selectedTicketFrame: TicketFrame = await getTicketFrameById(selectedTicketId)
  const userId = await getUserIdAfterCheckAuthRedirect()
  const allApplicableUserCoupon = await getApplicableUserCouponByTicketId(userId, selectedTicketId)
  return (
    <>
      <Title text="적용가능한 쿠폰 리스트" />
      <BorderCardContainer>
        <SubTitle bold={true} text="현재 티켓" />
        <StretchedTicket ticketFrame={selectedTicketFrame} />
      </BorderCardContainer>

      {allApplicableUserCoupon.length ? (
        <div className="flex flex-col gap-2">
          <SubTitle text="쿠폰을 클릭하시면 사용하실 수 있습니다." />
          {allApplicableUserCoupon.map((userCoupon: UserCoupon) => (
            <BottomSheetModal
              key={userCoupon.id}
              trigger={<StretchedUserCoupon userCoupon={userCoupon}></StretchedUserCoupon>}
              content={
                <div className="flex flex-row justify-center">
                  <Link href={`/order?ticketId=${selectedTicketId}&couponId=${userCoupon.id}`}>
                    <BottomSheetButton>사용하기</BottomSheetButton>
                  </Link>
                </div>
              }
            ></BottomSheetModal>
          ))}
        </div>
      ) : (
        <SubTitle text="적용 가능한 쿠폰이 없습니다." />
      )}
    </>
  )
}
