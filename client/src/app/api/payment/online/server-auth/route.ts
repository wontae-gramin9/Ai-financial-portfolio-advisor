import request, { gql } from 'graphql-request'
import { RedirectType, redirect } from 'next/navigation'

const SEND_PAYMENT_APPROVAL_MUTATION = gql`
  mutation SendPaymentApproval($tid: String!, $amount: String!) {
    serverAuth(input: { tid: $tid, amount: $amount }) {
      resultCode
    }
  }
`

type SendPaymentApprovalResponse = {
  serverAuth: {
    resultCode: string
  }
}

export async function POST(req: Request) {
  const response: FormData = await req.formData()
  const tid = response.get('tid')?.toString()
  const amount = response.get('amount')?.toString()

  const data: SendPaymentApprovalResponse = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    SEND_PAYMENT_APPROVAL_MUTATION,
    {
      tid,
      amount,
    },
  )

  const resultCode = data.serverAuth.resultCode
  const result = resultCode === '0000' ? 'success' : 'fail'
  redirect(`/redirection/payment/${result}`, RedirectType.replace)
}
