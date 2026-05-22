import Link from 'next/link'
import Button from '@/components/molecules/Button/Button'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'
import BorderCardContainer from '@/components/organisms/BorderCardContainer'
import UserCardList from '@/components/organisms/Card/UserCardList'
import NicepayPopupButton from '@/components/organisms/NicepayPopupButton'

type PaymentTemplateProps = {
  billingTypeName: '일회권' | '정기권'
  userId: string
  ticketId: string
  couponId: string | null
}
export default async function PaymentTemplate(props: PaymentTemplateProps) {
  const { billingTypeName, userId, ticketId, couponId } = props

  return (
    <div className="flex flex-col gap-2">
      <Title text={`${billingTypeName} 결제`} />
      <BorderCardContainer>
        <SubTitle bold={true} text="내 카드 목록" />
        <UserCardList ticketId={ticketId} couponId={couponId} />
        <div className="flex flex-row justify-end gap-1">
          <Link href="/card/register">
            <Button>카드 등록</Button>
          </Link>
          {billingTypeName === '일회권' ? (
            <NicepayPopupButton userId={userId} ticketId={ticketId} couponId={couponId} />
          ) : (
            <></>
          )}
        </div>
      </BorderCardContainer>
    </div>
  )
}
