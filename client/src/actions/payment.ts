'use server'
import request, { gql } from 'graphql-request'
import { redirect, RedirectType } from 'next/navigation'
import { Card } from '@/models/card'

export async function getBillingKeyTerm() {
  const GET_BILLING_KEY_TERM_QUERY = gql`
    query GetBillingKeyTerm($type: TermsType!) {
      term(type: $type) {
        content
      }
    }
  `

  type BillingKeyTermRequest = {
    type: 'eletorn' | 'colletperson' | 'sharinginfo' | 'telcommun'
  }

  const data: {
    term: {
      termsTitle: string
      content: string
    }
  } = await request(process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!, GET_BILLING_KEY_TERM_QUERY, {
    type: 'eletorn',
  } as BillingKeyTermRequest)

  const billingKeyTerm = data.term
  return billingKeyTerm
}

export async function getUserCardList(userId: string) {
  const GET_USER_CARD_LIST = gql`
    query GetUserCardList($userId: String!) {
      user(userId: $userId) {
        cards {
          cardCode
          cardName
          cardNum
          id
          representative
          userId
        }
      }
    }
  `

  const data: { user: [{ cards: Card[] }] } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    GET_USER_CARD_LIST,
    {
      userId,
    },
  )
  const userCardList = data.user[0].cards
  return userCardList
}

export async function registerUserCard(userId: string, formData: FormData) {
  const REGISTER_USER_CARD = gql`
    mutation RegisterUserCard(
      $userId: String!
      $expYear: String!
      $expMonth: String!
      $idNo: String!
      $cardPw: String!
      $cardNo: String!
    ) {
      cardAuth(
        input: {
          userId: $userId
          expYear: $expYear
          expMonth: $expMonth
          idNo: $idNo
          cardPw: $cardPw
          cardNo: $cardNo
        }
      ) {
        resultCode
      }
    }
  `

  const cardNo0 = formData.get('cardNo0')?.toString()!
  const cardNo1 = formData.get('cardNo1')?.toString()!
  const cardNo2 = formData.get('cardNo2')?.toString()!
  const cardNo3 = formData.get('cardNo3')?.toString()!
  const cardNo = cardNo0 + cardNo1 + cardNo2 + cardNo3
  const expYear = formData.get('expYear')
  const expMonth = formData.get('expMonth')
  const idNo = formData.get('idNo')
  const cardPw = formData.get('cardPw')

  const data: { cardAuth: { resultCode: string } } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    REGISTER_USER_CARD,
    {
      userId,
      expYear,
      expMonth,
      idNo,
      cardPw,
      cardNo,
    },
  )
  const resultCode = data.cardAuth.resultCode
  return resultCode
}

export async function requestPaymentByUserCard(
  userId: string,
  cardId: string,
  ticketId: string,
  couponId: string | null,
) {
  const REQUEST_PAYMENT_BY_CARD_ID = gql`
    mutation RequestPaymentByUserCard($userId: String!, $cardId: String!, $ticketId: String!, $couponId: String) {
      addOrder(input: { userId: $userId, cardId: $cardId, ticketId: $ticketId, couponId: $couponId }) {
        resultCode
        resultMsg
      }
    }
  `
  const data: { addOrder: { resultCode: string; resultMsg: string } } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    REQUEST_PAYMENT_BY_CARD_ID,
    {
      userId,
      cardId,
      ticketId,
      couponId,
    },
  )
  const { resultCode } = data.addOrder
  const result = resultCode === '0000' ? 'success' : 'fail'
  redirect(`/redirection/payment/${result}`, RedirectType.replace)
}

export async function deleteCardByCardId(cardId: string, ticketId: string, couponId: string | null) {
  const DELETE_USER_CARD_BY_CARD_ID = gql`
    mutation DeleteUserCard($cardId: String!) {
      deleteCardByCardId(cardId: $cardId) {
        resultCode
      }
    }
  `
  // @서버 03/31 input있었는데 없어짐
  // @서버 03/31 resultCode 받아와야하는데 없음
  const data: { deleteCardByCardId: { resultCode: string } } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    DELETE_USER_CARD_BY_CARD_ID,
    {
      cardId,
    },
  )
  const resultCode = data.deleteCardByCardId.resultCode
  const result = resultCode === '0000' ? 'success' : 'fail'
  redirect(`/redirection/carddelete/${result}?ticketId=${ticketId}&couponId=${couponId}`, RedirectType.replace)
}
