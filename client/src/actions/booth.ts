'use server'

import request, { gql } from 'graphql-request'
import { RedirectType, redirect } from 'next/navigation'
import { Bookable } from '@/models/bookable'

export async function getAllBookable() {
  const GET_ALL_BOOTH = gql`
    query getAllBookable {
      booking {
        id
        seat {
          number
          type
          name
        }
        ticketId
        userId
        bookableType {
          name
          type
        }
      }
    }
  `

  const data: { booking: Bookable[] } = await request(process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!, GET_ALL_BOOTH)

  const { booking: allBookableList } = data
  return allBookableList
}

export async function getBoookableById(id: string) {
  const GET_BOOKABLE_BY_ID = gql`
    query GetBookableStatus($id: String!) {
      booking(id: $id) {
        id
        seat {
          number
          type
          name
        }
        ticketId
        userId
        bookableType {
          name
          type
        }
      }
    }
  `

  const data: { booking: Bookable[] } = await request(process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!, GET_BOOKABLE_BY_ID, {
    id,
  })

  const { booking: bookable } = data
  return bookable[0]
}

export async function getUserActivatedBoookable(userId: string, types?: string[]) {
  const GET_USER_ACTIVATED_BOOKABLE = gql`
    query getUserActivatedBoookable($userId: String!) {
      booking(used: true, userId: $userId) {
        id
        seat {
          number
          type
          name
        }
        ticketId
        userId
        bookableType {
          name
          type
        }
      }
    }
  `

  const data: { booking: Bookable[] } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    GET_USER_ACTIVATED_BOOKABLE,
    {
      userId,
    },
  )

  const { booking } = data
  let activatedBookableList: Bookable[] = []
  if (types) {
    types.forEach((type) => {
      activatedBookableList = activatedBookableList.concat(
        booking.filter((bookable: Bookable) => bookable.bookableType.type === type),
      )
    })
  } else {
    activatedBookableList = booking
  }
  return activatedBookableList
}

export async function moveToNewBookable(userId: string, bookableId: string) {
  const MOVE_TO_NEW_BOOKABLE = gql`
    mutation MoveToNewBookable($userId: String!, $bookableId: String!) {
      moveBooking(input: { userId: $userId, id: $bookableId }) {
        resultCode
      }
    }
  `

  const data: { moveBooking: { resultCode: string } } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    MOVE_TO_NEW_BOOKABLE,
    {
      userId,
      bookableId,
    },
  )

  const resultCode = data.moveBooking.resultCode
  const result = resultCode === '0000' ? 'success' : 'fail'
  redirect(`/redirection/move/${result}`, RedirectType.replace)
}
