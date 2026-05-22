import { getUserIdAfterCheckAuthRedirect } from '@/actions/authjs'
import Title from '@/components/molecules/Title/Title'
import CardForm from '@/components/organisms/Card/CardForm'

export default async function CardRegisterPage() {
  const userId = await getUserIdAfterCheckAuthRedirect()
  return (
    <>
      <Title text="카드 등록하기" />
      <CardForm userId={userId} />
    </>
  )
}
