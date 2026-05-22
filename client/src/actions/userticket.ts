'use server'
import request, { gql } from 'graphql-request'
import { RedirectType, redirect } from 'next/navigation'
import { UserTicket } from '@/models/ticket'

export async function getAllUserTicket(userId: string) {
  const GET_ALL_USERTICKET = gql`
    query GetAllUserticket($userId: String!) {
      ticket(userId: $userId) {
        ticketType {
          bookableType {
            name
            type
          }
          name
          remaining
          purchasePrice
          expires
          id
          limit
          type
        }
        expiresAt
        endsAt
        availableTime
        id
        refund
        userId
        used
      }
    }
  `

  const data: { ticket: UserTicket[] } = await request(process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!, GET_ALL_USERTICKET, {
    userId,
  })

  const { ticket: allUserTicket } = data
  return allUserTicket
}

export async function getAllUserTicketByBookable(userId: string, bookable: string) {
  const GET_ALL_USERTICKET_BY_BOOKABLE = gql`
    query GetAllUserticket($userId: String!, $bookable: String!) {
      ticket(userId: $userId, bookableType: $bookable) {
        ticketType {
          bookableType {
            name
            type
          }
          name
          remaining
          purchasePrice
          expires
          id
          limit
          type
        }
        expiresAt
        endsAt
        availableTime
        id
        refund
        userId
        used
      }
    }
  `

  const data: { ticket: UserTicket[] } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    GET_ALL_USERTICKET_BY_BOOKABLE,
    {
      userId,
      bookable,
    },
  )

  const { ticket: allUserTicketByBookable } = data
  return allUserTicketByBookable
}

export async function enterBookableByUserTicket(userId: string, ticketId: string, bookableId: string) {
  const ENTER_BOOKABLE_BY_USER_TICKET = gql`
    mutation EnteringBooking($userId: String!, $ticketId: String!, $bookableId: String!) {
      enteringBooking(input: { userId: $userId, ticketId: $ticketId, id: $bookableId }) {
        resultCode
      }
    }
  `

  const data: { enteringBooking: { resultCode: string } } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    ENTER_BOOKABLE_BY_USER_TICKET,
    {
      userId,
      ticketId,
      bookableId,
    },
  )

  const resultCode = data.enteringBooking.resultCode
  const result = resultCode === '0000' ? 'success' : 'fail'
  redirect(`/redirection/useuserticket/${result}`, RedirectType.replace)
}

export async function nipoutUserTicket(userId: string, ticketId: string) {
  const NIPOUT_BOOKABLE = gql`
    mutation NipoutBookable($userId: String!, $ticketId: String!) {
      outingBooking(input: { userId: $userId, id: $ticketId }) {
        resultCode
      }
    }
  `

  const data: { outingBooking: { resultCode: string } } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    NIPOUT_BOOKABLE,
    {
      userId,
      ticketId,
    },
  )

  const resultCode = data.outingBooking.resultCode
  const result = resultCode === '0000' ? 'success' : 'fail'
  redirect(`/redirection/nipout/${result}`, RedirectType.replace)
}

export async function checkoutUserTicket(userId: string, ticketId: string) {
  const CHECKOUT_BOOKABLE = gql`
    mutation leavingBooking($userId: String!, $ticketId: String!) {
      leavingBooking(input: { userId: $userId, ticketId: $ticketId }) {
        resultCode
      }
    }
  `
  const data: { leavingBooking: { resultCode: string } } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    CHECKOUT_BOOKABLE,
    {
      userId,
      ticketId,
    },
  )

  const resultCode = data.leavingBooking.resultCode
  const result = resultCode === '0000' ? 'success' : 'fail'
  redirect(`/redirection/checkout/${result}`, RedirectType.replace)
}
