import { getUserIdAfterCheckAuthRedirect } from '@/actions/authjs'
import { getCouponFrame } from '@/actions/couponframe'
import { registerUserCoupon } from '@/actions/usercoupon'
import Button from '@/components/molecules/Button/Button'
import StretchedCoupon from '@/components/molecules/Coupon/StretchedCoupon'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'

export default async function CouponRegisterPage({ params }: { params: { couponFrameId: string } }) {
  const { couponFrameId } = params
  const userId = await getUserIdAfterCheckAuthRedirect()
  const couponFrame = await getCouponFrame(couponFrameId)
  const registerUserCouponByCouponId = await registerUserCoupon.bind(null, userId, couponFrameId)
  return (
    <>
      <Title text="쿠폰 등록하기" />
      <div className="container mx-auto max-w-screen-sm overflow-hidden  rounded-lg border border-black-100">
        <div className="bg-white-500 py-2">
          <SubTitle text="등록될 쿠폰입니다." />
        </div>
        <div className="px-4 py-6">
          <StretchedCoupon couponFrame={couponFrame}></StretchedCoupon>
          <div className="my-12"></div>
          <form action={registerUserCouponByCouponId}>
            <div className="flex flex-row justify-center">
              <Button form={true}>쿠폰등록</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
