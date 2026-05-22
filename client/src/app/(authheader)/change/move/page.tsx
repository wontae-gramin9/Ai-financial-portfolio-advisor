import { headers } from 'next/headers'
import Link from 'next/link'
import { RedirectType, redirect } from 'next/navigation'
import { getUserIdAfterCheckAuthRedirect } from '@/actions/authjs'
import { getBoookableById, getUserActivatedBoookable, moveToNewBookable } from '@/actions/booth'
import BookableCard from '@/components/molecules/BookableCard'
import Button from '@/components/molecules/Button/Button'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'

export default async function BookableMovePage() {
  const userId = await getUserIdAfterCheckAuthRedirect()
  const urlObject = new URL(headers().get('x-url')!)
  const currentBookableId = urlObject.searchParams.get('id') ?? 'bookableIdError'
  const currentBookable = await getBoookableById(currentBookableId)
  const [userActivatedBookable] = await getUserActivatedBoookable(userId, [currentBookable.bookableType.type])
  const moveToNewBookableByBookableId = moveToNewBookable.bind(null, userId, currentBookableId)
  if (currentBookableId === userActivatedBookable.id) {
    redirect(`/redirection/default/fail`, RedirectType.replace)
  } else {
    return (
      <div className="flex flex-col gap-2">
        <Title text="이동" />
        {userActivatedBookable ? (
          <div className="flex flex-col gap-2">
            <SubTitle text="이동하실 예약의 이동 버튼을 누르면 이동합니다." />
            <SubTitle text={`현재 이용중인 ${currentBookable.bookableType.name}`} bold={true} />
            <div key={userActivatedBookable.id} className="flex flex-row items-center justify-center gap-2">
              <BookableCard bookable={userActivatedBookable} />
            </div>
            <SubTitle text={`이동하실 ${currentBookable.bookableType.name}`} bold={true} />
            <div className="flex flex-row items-center justify-center gap-2">
              <BookableCard bookable={currentBookable} />
              <form action={moveToNewBookableByBookableId}>
                <Button form={true}>이동</Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center  gap-2">
            <p>현재 사용중인 좌석이 없어 이동할수 없습니다.</p>
            <Link href="/">
              <Button>홈으로 돌아기기</Button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}
