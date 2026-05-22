import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authjs'

export default async function AuthHeader() {
  const session = await getServerSession(authOptions)
  const userId = session?.userId

  return (
    <div className="container flex flex-row items-center bg-white-300 px-2">
      <Link className="inline-block" href="/">
        <Image
          className="box-border py-2 pr-2"
          src="/images/app_logo.png"
          alt="궁극의 창작공간"
          width="36"
          height="36"
        />
      </Link>
      <h1 className="text-lg font-bold">궁극의 창작공간</h1>
      <div className="grow"></div>
      <div className="flex flex-row gap-2">
        {userId ? (
          <>
            <Link href="/user/ticket/board" className="hover:underline">
              내 이용권
            </Link>
            <Link href="/auth/signout" className="hover:underline">
              로그아웃
            </Link>
          </>
        ) : (
          <Link href="/auth/signin" className="hover:underline">
            로그인
          </Link>
        )}
      </div>
    </div>
  )
}
