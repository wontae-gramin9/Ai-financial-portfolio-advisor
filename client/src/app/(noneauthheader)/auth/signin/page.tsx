'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'
export default function KakaoLoginPage() {
  return (
    <>
      <Title text="카카오톡 로그인" />
      <KakaoLoginButtonSection />
    </>
  )
}

const KakaoLoginButtonSection = () => {
  const searchParams = useSearchParams()
  let encryptedPath = ''
  for (const key of searchParams.keys()) {
    encryptedPath += key
  }

  const redirectUrl =
    encryptedPath === ''
      ? '/'
      : encryptedPath.replaceAll('^', '/').replaceAll('-', '&').replaceAll('(', '?').replaceAll(')', '=')
  return (
    <div className="container mx-auto max-w-screen-sm  overflow-hidden  rounded-lg border border-black-100">
      <div className="flex flex-col px-4">
        <div className="h-6"></div>
        <SubTitle text="궁극의 창작공간에서는 편하게 카카오톡 로그인을 지원해요!" />
        <div className="h-24"></div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              signIn('kakao', { callbackUrl: redirectUrl })
            }}
          >
            <Image src="/kakao/90x45.png" width={90} height={45} alt="카카오 로그인"></Image>
          </button>
        </div>
      </div>
      <div className="h-6"></div>
    </div>
  )
}
