import Link from 'next/link'
import { getAllTicketFrame } from '@/actions/ticketframe'
import BottomSheetButton from '@/components/molecules/Button/BottomSheetButton'
import BottomSheetModal from '@/components/molecules/Modal/BottomSheetModal'
import CardTicket from '@/components/molecules/Ticket/CardTicket'
import Title from '@/components/molecules/Title/Title'
import { TicketFrame } from '@/models/ticket'

export default async function BillingTicketPage() {
  const billingTicketList = await getAllTicketFrame('billing')
  return (
    <>
      <Title text="정기권 구매하기" />
      {billingTicketList.map((billingTicketFrame: TicketFrame, idx: number) => (
        <BottomSheetModal
          key={idx}
          trigger={<CardTicket key={idx} ticketFrame={billingTicketFrame}></CardTicket>}
          content={
            <div className="flex flex-row justify-center">
              <Link
                href={{
                  pathname: '/billingterm',
                  query: {
                    ticketId: billingTicketFrame.id,
                  },
                }}
              >
                <BottomSheetButton>구매하기</BottomSheetButton>
              </Link>
            </div>
          }
        ></BottomSheetModal>
      ))}
    </>
  )
}
