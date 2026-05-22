import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Button from '@/components/molecules/Button/Button'
import { Dialog } from '@/components/molecules/Modal/Dialog'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'
import BillingKeyTerm from '@/components/organisms/BillingKeyTerm'

function BillingTermPage() {
  const urlObject = new URL(headers().get('x-url')!)
  const ticketId = urlObject.searchParams.get('ticketId')
  return (
    <div>
      <Title text="정기결제 약관 동의" />
      <div className="flex h-72 flex-col items-center justify-center">
        <SubTitle text="약관에 동의하시면 정기결제를 이용할 수 있습니다." />
        <div className="h-4"></div>
        <Dialog
          trigger={
            <div className="flex flex-row justify-center">
              <Button>약관 펼쳐보기</Button>
            </div>
          }
          title="정기결제 약관"
          content={<BillingKeyTerm />}
          actionName="동의하고 결제하러 가기"
          action={async () => {
            'use server' // @클라 04/01 functions cannot be passed directly to client components 워크어라운드
            redirect(`/payment?ticketId=${ticketId}`)
          }}
        ></Dialog>
      </div>
    </div>
  )
}

export default BillingTermPage
