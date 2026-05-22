'use server'
import { TypedDocumentNode, gql } from '@apollo/client'
import request from 'graphql-request'
import { GET_ALL_TICKET_FRAME } from '@/gql/ticketframe'
import { TicketFrame } from '@/models/ticket'

export async function getAllTicketFrame(type?: TicketFrame['type']) {
  const data = await request(process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!, GET_ALL_TICKET_FRAME, {
    type,
  })

  const { ticketType: ticketFrameList } = data
  return ticketFrameList
}

export async function getTicketFrameById(id: string) {
  const GET_TICKET_FRAME_BY_ID: TypedDocumentNode = gql`
    query GetTicketFrameById($id: String) {
      ticketType(ticketTypeId: $id) {
        bookableType {
          name
          type
        }
        name
        remaining
        purchasePrice
        expires
        number
        id
        limit
        type
        typeName
      }
    }
  `

  const data = await request(process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!, GET_TICKET_FRAME_BY_ID, {
    id,
  })

  const { ticketType: ticketFrameList } = data
  const [ticketFrame]: [TicketFrame] = ticketFrameList
  return ticketFrame
}
