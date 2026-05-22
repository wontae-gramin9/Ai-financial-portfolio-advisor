import { getUserIdAfterCheckAuthRedirect } from '@/actions/authjs'
import { deleteCardByCardId, requestPaymentByUserCard } from '@/actions/payment'
import Button from '@/components/molecules/Button/Button'
import { Dialog } from '@/components/molecules/Modal/Dialog'
import SubTitle from '@/components/molecules/Title/SubTitle'
import { Card } from '@/models/card'
import { formatCardNumber } from '@/utils/format'

export default async function UserCard(props: { card: Card; ticketId: string; couponId: string | null }) {
  const { card, ticketId, couponId } = props
  const userId = await getUserIdAfterCheckAuthRedirect()
  const isRepresentative = card.representative === '0'
  const color = isRepresentative ? 'bg-blue-300' : 'bg-blue-100'
  const makeOrderByUserCardId = requestPaymentByUserCard.bind(null, userId, card.id, ticketId, couponId)
  const deleteUserCardByCardId = deleteCardByCardId.bind(null, card.id, ticketId, couponId)
  return (
    <div className="flex flex-row items-center gap-2 overflow-hidden rounded-lg border border-solid bg-white-300 pr-2">
      <div className={`relative flex flex-col items-center justify-center ${color} h-24 w-16`}>
        <p className="text-white-100">{card.cardName}</p>
        {isRepresentative ? <p className="text-sm text-white-100">최근결제</p> : <></>}
      </div>
      <div>
        <p className="text-sm">{formatCardNumber(card.cardNum)}</p>
      </div>
      <div className="grow"></div>
      <div className="flex flex-col gap-1">
        <Dialog
          trigger={<Button>결제</Button>}
          title="결제하기"
          content={<PayWithCardDialogContent card={card} />}
          actionName="결제하기"
          action={makeOrderByUserCardId}
        ></Dialog>
        <Dialog
          trigger={<Button color="red">삭제</Button>}
          title="카드삭제"
          content={<DeleteCardDialogContent />}
          actionName="카드삭제"
          action={deleteUserCardByCardId}
        ></Dialog>
      </div>
    </div>
  )
}

const PayWithCardDialogContent = (props: { card: Card }) => {
  const { card } = props

  return (
    <div className="flex flex-col gap-2">
      <SubTitle text="선택하신 카드" />
      <p className="text-center font-bold">
        {card.cardName} {formatCardNumber(card.cardNum)}
      </p>
      <p className="text-center">로 결제 진행하시겠습니까?</p>
    </div>
  )
}

const DeleteCardDialogContent = () => {
  return (
    <div className="flex flex-col gap-2">
      <p>카드를 삭제하시면 카드에 등록된 자동결제는 자동 해지됩니다.</p>
      <p>카드삭제를 진행하시겠습니까?</p>
    </div>
  )
}
