import request, { gql } from 'graphql-request'

// @클라 04/04 클라이언트 컴포넌트에서 사용되기 때문에 next/navigation의 redirect 사용 불가
// @클라 때문에 result값을 반환해서 컴포넌트에서 useRouter 사용
export async function refundUserTicket(ticketId: string) {
  // const router = useRouter()
  const REFUND_USER_TICKET = gql`
    mutation RefundUserTicket($ticketId: String!) {
      refundTicket(input: { ticketId: $ticketId }) {
        resultCode
      }
    }
  `

  const data: { refundTicket: { resultCode: string } } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    REFUND_USER_TICKET,
    {
      ticketId,
    },
  )

  const resultCode = data.refundTicket.resultCode
  const result = resultCode === '0000' ? 'success' : 'fail'
  return result
}

export async function unsubscribeUserTicket(ticketId: string) {
  const UNSUBSCIRE_USER_TICKET = gql`
    mutation UnsubscribeUserTicket($ticketId: String!) {
      cancelSubscriptionTicket(input: { ticketId: $ticketId }) {
        resultCode
      }
    }
  `

  const data: { cancelSubscriptionTicket: { resultCode: string } } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    UNSUBSCIRE_USER_TICKET,
    {
      ticketId,
    },
  )

  const resultCode = data.cancelSubscriptionTicket.resultCode
  const result = resultCode === '0000' ? 'success' : 'fail'
  return result
}
