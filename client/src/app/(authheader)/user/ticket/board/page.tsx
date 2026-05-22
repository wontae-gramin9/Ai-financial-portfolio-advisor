import Link from 'next/link'
import { getUserIdAfterCheckAuthRedirect } from '@/actions/authjs'
import { getAllUserTicket } from '@/actions/userticket'
import Button from '@/components/molecules/Button/Button'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'
import AccordionUserTicket from '@/components/organisms/AccordionUserTicket'
import type { UserTicket } from '@/models/ticket'

export default async function UserTicketManagePage() {
  const userId = await getUserIdAfterCheckAuthRedirect()
  const allUserTicket = await getAllUserTicket(userId)
  const activatedTickets = allUserTicket.filter((ticket) => ticket.used === true)
  const archivedTickets = allUserTicket.filter((ticket) => ticket.used === false)
  return (
    <div className="flex flex-col gap-2">
      <Title text="내 이용권 현황/관리" />
      <div>
        <SubTitle bold={true} text="현재 사용중인 이용권" />
        <div>
          {activatedTickets.length ? (
            activatedTickets.map((activatedTicket: UserTicket) => (
              <AccordionUserTicket key={activatedTicket.id} userTicket={activatedTicket}></AccordionUserTicket>
            ))
          ) : (
            <div>
              <p className="text-center">
                현재 이용중인 사용권이 없습니다. 예약의 QR코드를 스캔하시면 이용권을 사용할 수 있습니다.
              </p>
            </div>
          )}
        </div>
      </div>
      <div>
        <SubTitle bold={true} text="보관중인 이용권" />
        <div className="flex flex-col gap-2">
          {archivedTickets.length ? (
            archivedTickets.map((archivedTicket: UserTicket) => (
              <AccordionUserTicket key={archivedTicket.id} userTicket={archivedTicket}></AccordionUserTicket>
            ))
          ) : (
            <div className="flex flex-col gap-2">
              <SubTitle text="현재 보관중인 사용권이 없습니다. 아래 버튼을 누르시면 권종에 따라 구매하실 수 있습니다." />
              <div className="flex flex-row justify-center gap-2">
                {[
                  ['oneoff', '일회권'],
                  ['billing', '정기권'],
                ].map(([ticketBillingType, ticketBillingName]) => (
                  <Link key={ticketBillingType} href={`/ticket/${ticketBillingType}`}>
                    <Button>{ticketBillingName}</Button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
