'use client'

import Script from 'next/script'
import Button from '@/components/molecules/Button/Button'
import { executeAuthPaymentPopup, getPreNicePayOrderInfo } from '@/lib/nicepay'
import { Order } from '@/models/order'

type NicepayPopupButtonProps = {
  userId: string
  ticketId: string
  couponId: string | null
}

export default function NicepayPopupButton(props: NicepayPopupButtonProps) {
  const { userId, ticketId, couponId } = props
  const order: Order = { userId, ticketId, couponId, cardId: null }
  return (
    <>
      <Button
        onClick={async () => {
          const { orderId, priceString, orderName } = await getPreNicePayOrderInfo(order)
          const price = parseInt(priceString)
          await executeAuthPaymentPopup({
            orderId,
            ticketName: orderName,
            price,
            paymentMethod: 'cardAndEasyPay',
          })
        }}
      >
        앱카드결제
      </Button>
      <Script src="https://pay.nicepay.co.kr/v1/js/" />
    </>
  )
}
