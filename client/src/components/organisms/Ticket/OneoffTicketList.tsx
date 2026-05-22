'use client'

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import Link from 'next/link'
import BottomSheetButton from '@/components/molecules/Button/BottomSheetButton'
import BottomSheetModal from '@/components/molecules/Modal/BottomSheetModal'
import StretchedTicket from '@/components/molecules/Ticket/StretchedTicket'
import { GET_ALL_TICKET_FRAME } from '@/gql/ticketframe'
import useIsReactNativeWebview from '@/hooks/useIsReactNativeWebview'

export const dynamic = 'force-dynamic'

const OneoffTicketList = (props: { type: string }) => {
  const isReactNativeWebview = useIsReactNativeWebview()
  const { type } = props
  const { data } = useSuspenseQuery(GET_ALL_TICKET_FRAME, {
    variables: { type: type },
  })
  const { ticketType: oneoffTicketList } = data
  return (
    <>
      {oneoffTicketList.map((oneoffTicket: any, idx: number) => (
        <BottomSheetModal
          key={idx}
          trigger={<StretchedTicket key={idx} ticketFrame={oneoffTicket}></StretchedTicket>}
          content={
            <div className="flex flex-row justify-center">
              {isReactNativeWebview ? (
                <BottomSheetButton
                  onClick={() => {
                    window.ReactNativeWebView.postMessage(JSON.stringify('1'))
                  }}
                >
                  구매하기
                </BottomSheetButton>
              ) : (
                <Link
                  href={{
                    pathname: '/order',
                    query: {
                      ticketId: oneoffTicket.id,
                    },
                  }}
                >
                  <BottomSheetButton>구매하기</BottomSheetButton>
                </Link>
              )}
            </div>
          }
        ></BottomSheetModal>
      ))}
    </>
  )
}

export default OneoffTicketList
