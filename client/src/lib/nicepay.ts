import request, { gql } from 'graphql-request'
import { RedirectType, redirect } from 'next/navigation'
import { Order } from '@/models/order'

// 이후에 order 객체로
export type AuthPaymentProps = {
  orderId: string
  ticketName: string
  price: number
  paymentMethod: 'cardAndEasyPay' | 'samsungpayCard'
}

export type AuthPaymentResponse = {
  errorMsg: string
}

// 인증결제(일회성결제)
export const executeAuthPaymentPopup = async (props: AuthPaymentProps): Promise<void> => {
  const { orderId, ticketName, price, paymentMethod } = props
  const { AUTHNICE } = window
  AUTHNICE.requestPay({
    clientId: process.env.NEXT_PUBLIC_NICEPAY_SERVER_AUTH_CLIENT_KEY,
    method: paymentMethod,
    orderId,
    amount: price,
    goodsName: ticketName,
    returnUrl: process.env.NEXT_PUBLIC_NICEPAY_AUTH_PAYMENT_POPUP_RESULT_ENDPOINT, //API를 호출할 Endpoint
    fnError: (result: AuthPaymentResponse) => alert(result.errorMsg),
  })
}

export const getPreNicePayOrderInfo = async (order: Order) => {
  const SEND_ORDER = gql`
    mutation SendOrder($userId: String!, $cardId: String, $ticketId: String!, $couponId: String) {
      addOrder(input: { userId: $userId, cardId: $cardId, couponId: $couponId, ticketId: $ticketId }) {
        resultCode
        resultMsg
      }
    }
  `

  const data: { addOrder: { resultCode: string; resultMsg: string } } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    SEND_ORDER,
    {
      ...order,
    },
  )

  const { resultCode, resultMsg } = data.addOrder
  const result = resultCode === '0000' ? 'success' : 'fail'
  if (result === 'fail') redirect(`/redirection/nicepay/${result}`, RedirectType.replace)
  const [orderId, priceString, orderName] = resultMsg.split(':')
  return { orderId, priceString, orderName }
}
