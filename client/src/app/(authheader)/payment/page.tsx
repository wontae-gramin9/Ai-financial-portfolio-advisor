import { headers } from 'next/headers'
import { getUserIdAfterCheckAuthRedirect } from '@/actions/authjs'
import { getTicketFrameById } from '@/actions/ticketframe'
import PaymentTemplate from '@/components/templates/PaymentTemplate'

export default async function PaymentPage() {
  const userId = await getUserIdAfterCheckAuthRedirect()
  const urlObject = new URL(headers().get('x-url')!)
  const selectedTicketId = urlObject.searchParams.get('ticketId') ?? 'ticketIdError'
  const selectedCouponId =
    urlObject.searchParams.get('couponId') === 'null' ? null : urlObject.searchParams.get('couponId')
  const ticketFrame = await getTicketFrameById(selectedTicketId)
  const billingTypeName = ticketFrame.type === 'billing' ? '정기권' : '일회권'
  return (
    <PaymentTemplate
      billingTypeName={billingTypeName}
      userId={userId}
      ticketId={selectedTicketId}
      couponId={selectedCouponId}
    />
  )
}
