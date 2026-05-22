'use client'

import Link from 'next/link'
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Button from '@/components/molecules/Button/Button'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'

const getMsgAndRedirectionPathAndName = (action: string, searchParams: ReadonlyURLSearchParams) => {
  let successMsg = '올바른 접근이 아닙니다.'
  let failMsg = '알 수 없는 오류가 발생되었습니다. 관리자에게 문의해주세요.'
  let redirectionPath = '/'
  let redirectionPathName = '홈페이지'

  switch (action) {
    case 'checkout':
      successMsg = '퇴실이 완료되었습니다.'
      break
    case 'nipout':
      successMsg = '30분동안 외출 가능하고, 전원은 연결되지 않습니다.'
      break
    case 'nicepay':
      failMsg = '결제정보를 서버에서 받아오는데 문제가 있습니다. 관리자에게 문의해주세요.'
      redirectionPath = '/ticket/oneoff'
      redirectionPathName = '일회용 이용권 구매 페이지'
      break
    case 'move':
      successMsg = '자리 이동이 완료되었습니다.'
      break
    case 'useuserticket':
      successMsg = '티켓 사용이 완료되었습니다.'
      redirectionPath = '/booth/status'
      redirectionPathName = '현황 페이지'
      break
    case 'carddelete': {
      const ticketId = searchParams.get('ticketId')
      const couponId = searchParams.get('couponId')
      successMsg = '카드 삭제가 완료되었습니다.'
      redirectionPath = `/payment?ticketId=${ticketId}&couponId=${couponId}`
      redirectionPathName = '결제 페이지'
      break
    }
    case 'registercoupon':
      successMsg = '쿠폰 등록이 완료되었습니다.'
      // 플로우에 따라서 달라질 것
      redirectionPath = '/user/coupon'
      redirectionPathName = '내 쿠폰 리스트 페이지'
      break
    case 'payment':
      successMsg = '이용권 구매가 완료되었습니다.'
      redirectionPath = `/user/ticket/board`
      redirectionPathName = '내 이용권 목록 페이지'
      break

    case 'refund':
      successMsg = '티켓 환불이 완료되었습니다.'
      redirectionPath = '/user/ticket/board'
      redirectionPathName = '내 이용권 현황/관리 페이지'
      break
    case 'unsubscribe':
      successMsg = '구독 취소가 완료되었습니다.'
      redirectionPath = '/user/ticket/board'
      redirectionPathName = '내 이용권 현황/관리 페이지'
      break
    default:
      break
  }
  return [successMsg, failMsg, redirectionPath, redirectionPathName]
}

export default function RedirectionPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [action, result] = slug
  const searchParams = useSearchParams()
  const [successMsg, failMsg, redirectionPath, redirectionPathName] = getMsgAndRedirectionPathAndName(
    action,
    searchParams,
  )
  const router = useRouter()
  const [redirectSeconds, setRedirectSeconds] = useState(10)
  useEffect(() => {
    if (redirectSeconds == 0) {
      router.push(redirectionPath!)
      return
    }

    setTimeout(() => {
      setRedirectSeconds((redirectSeconds) => redirectSeconds - 1)
    }, 1000)
  }, [router, redirectSeconds, redirectionPath])

  return (
    <>
      {result === 'success' ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <Title text="성공" />
          <div className="h-2"></div>
          <SubTitle bold={true} text={successMsg} />
          <SubTitle text={`${redirectSeconds}초 후 ${redirectionPathName!}로 자동으로 이동합니다.`} />
          <Link href={redirectionPath}>
            <Button>{redirectionPathName}으로 돌아가기</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <Title text="실패" />
          <SubTitle bold={true} text={failMsg} />
          <div className="flex flex-row gap-2">
            <Link href="/">
              <Button>홈으로 돌아가기</Button>
            </Link>
            <a href={process.env.NEXT_PUBLIC_ULTSPACE_CS!}>
              <Button>카카오톡 문의하기</Button>
            </a>
          </div>
        </div>
      )}
    </>
  )
}
