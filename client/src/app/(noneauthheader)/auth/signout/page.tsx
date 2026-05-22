'use client'

import { signOut } from 'next-auth/react'
import Button from '@/components/molecules/Button/Button'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'
export default function SignOutPage() {
  return (
    <>
      <Title text="로그아웃" />
      <SignOutButtonSection />
    </>
  )
}

const SignOutButtonSection = () => {
  return (
    <div className="container mx-auto max-w-screen-sm  overflow-hidden  rounded-lg border border-black-100">
      <div className="flex flex-col px-4">
        <div className="h-6"></div>
        <SubTitle text="로그아웃하시겠습니까?" />
        <div className="h-24"></div>
        <div className="flex justify-center">
          <Button
            color="red"
            onClick={() => {
              signOut({ callbackUrl: '/' })
            }}
          >
            로그아웃
          </Button>
        </div>
      </div>
      <div className="h-6"></div>
    </div>
  )
}
