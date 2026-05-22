'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '@/components/molecules/Button/Button'
import { Dialog } from '@/components/molecules/Modal/Dialog'
import StretchedTicket from '@/components/molecules/Ticket/StretchedTicket'
import { refundUserTicket, unsubscribeUserTicket } from '@/gql/userticket'
import type { UserTicket } from '@/models/ticket'
import { formatDatetimeString, formatLeftTimeString } from '@/utils/format'

const AccordionUserTicket = (props: { userTicket: UserTicket }) => {
  const router = useRouter()
  const [hidden, setHidden] = useState(true)
  const hiddenClass = hidden ? 'hidden' : ''
  const borderDirection = hidden ? 'rounded-md' : 'rounded-t-md '
  const chevronDirection = hidden ? 'rotate-180' : ''
  const { userTicket } = props

  return (
    <div>
      <div
        onClick={() => {
          setHidden(!hidden)
        }}
        tabIndex={0}
        className={`flex w-full items-center gap-1 ${borderDirection} border p-1 focus:ring-1`}
      >
        <div className="w-full">
          <StretchedTicket ticketFrame={userTicket.ticketType}></StretchedTicket>
        </div>
        <svg
          data-accordion-icon
          className={`${chevronDirection} size-3`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
        </svg>
      </div>
      <div className={hiddenClass}>
        <div className="flex flex-row justify-between gap-2 rounded-b-md border border-t-0 border-black-100 p-5">
          <div className="w-8/12 content-start">
            <div>
              <p className="font-bold">유효기간</p>
              <p>{formatDatetimeString(userTicket.endsAt)}</p>
            </div>
            <div>
              <p className="font-bold">만료기간</p>
              <p>{formatDatetimeString(userTicket.expiresAt)}</p>
            </div>
            {!['period', 'billing'].includes(userTicket.ticketType.type) ? (
              <div>
                <p className="font-bold">남은시간</p>
                <p>{formatLeftTimeString(userTicket.availableTime)}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Dialog
              trigger={<Button color="teal">환불하기</Button>}
              title="환불하기"
              content={<RefundDialogContent ticket={userTicket} />}
              actionName="환불하기"
              action={async () => {
                const result = await refundUserTicket(userTicket.id)
                router.replace(`/redirection/refund/${result}`)
                router.refresh()
              }}
            ></Dialog>
            {userTicket.ticketType.type === 'billing' ? (
              <Dialog
                trigger={<Button color="red">구독취소</Button>}
                title="구독취소"
                content={<UnsubscribeDialogContent ticket={userTicket} />}
                actionName="구독취소"
                action={async () => {
                  const result = await unsubscribeUserTicket(userTicket.id)
                  router.replace(`/redirection/unsubscribe/${result}`)
                  router.refresh()
                }}
              ></Dialog>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const RefundDialogContent = (props: { ticket: UserTicket }) => {
  const { ticket } = props
  return (
    <div className="flex flex-col gap-2">
      <p>환불받을 수 있는 금액은 {ticket.refund}원 입니다.</p>
      <p>환불을 진행하시겠습니까?</p>
    </div>
  )
}

const UnsubscribeDialogContent = (props: { ticket: UserTicket }) => {
  const { ticket } = props
  return (
    <div className="flex flex-col  gap-2">
      <p>자동 구독을 취소하시면 남은 구독기간({ticket.endsAt})까지는 변함없이 이용이 가능하나</p>
      <p>그 이후부터는 재구독이 되지 않습니다.</p>
      <p>구독취소를 진행하시겠습니까?</p>
    </div>
  )
}

export default AccordionUserTicket
