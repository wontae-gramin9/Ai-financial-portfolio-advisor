import { headers } from 'next/headers'
import Link from 'next/link'
import { checkAuthRedirect } from '@/actions/authjs'
import Button from '@/components/molecules/Button/Button'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'
import BorderCardContainer from '@/components/organisms/BorderCardContainer'
import OrderCard from '@/components/organisms/OrderCard'

export default async function OrderPage() {
  await checkAuthRedirect()
  const urlObject = new URL(headers().get('x-url')!)
  const selectedTicketId = urlObject.searchParams.get('ticketId') ?? 'ticketIdError'
  const selectedCouponId = urlObject.searchParams.get('couponId')
  return (
    <div className="flex flex-col gap-2">
      <Title text="일회권 결제" />
      <BorderCardContainer>
        <SubTitle bold={true} text="현재 결제 정보" />
        <OrderCard ticketId={selectedTicketId} couponId={selectedCouponId} />
      </BorderCardContainer>
      <div className="flex flex-row justify-end">
        <Link href={`/payment?ticketId=${selectedTicketId}&couponId=${selectedCouponId}`}>
          <Button>결제하기</Button>
        </Link>
      </div>
    </div>
  )
}
