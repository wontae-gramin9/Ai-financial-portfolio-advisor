import { TypedDocumentNode, gql } from '@apollo/client'

export const GET_ALL_TICKET_FRAME: TypedDocumentNode = gql`
  query GetAllTicketFrame($type: String) {
    ticketType(type: $type) {
      bookableType {
        name
        type
      }
      name
      remaining
      purchasePrice
      expires
      id
      number
      limit
      type
      typeName
    }
  }
`
