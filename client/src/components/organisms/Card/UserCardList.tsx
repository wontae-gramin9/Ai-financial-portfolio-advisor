import { getUserIdAfterCheckAuthRedirect } from '@/actions/authjs'
import { getUserCardList } from '@/actions/payment'
import SubTitle from '@/components/molecules/Title/SubTitle'
import UserCard from '@/components/organisms/Card/UserCard'
import { Card } from '@/models/card'

export default async function UserCardList(props: { ticketId: string; couponId: string | null }) {
  const { ticketId, couponId } = props
  const userId = await getUserIdAfterCheckAuthRedirect()
  const userCardList = await getUserCardList(userId)

  return (
    <div className="flex flex-col gap-2">
      {userCardList ? (
        <div className="flex flex-col gap-2">
          <SubTitle text="카드를 클릭하시면 결제를 진행하실 수 있습니다." />
          {userCardList.map((usercard: Card) => (
            <UserCard key={usercard.id} card={usercard} ticketId={ticketId} couponId={couponId} />
          ))}
        </div>
      ) : (
        <SubTitle text="카드를 등록하시면 더 간편하게 결제하실 수 있습니다." />
      )}
    </div>
  )
}
