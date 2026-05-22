import Image from 'next/image'
import type { CouponFrame } from '@/models/coupon'

const StretchedCoupon = (props: { couponFrame: CouponFrame }) => {
  const { couponFrame } = props

  const borderColors: { [key in CouponFrame['type']]: string } = {
    sale: 'border-teal-100',
    timebonus: 'border-orange-100',
    discount: 'border-red-100',
  }

  const bookableColors: { [key in CouponFrame['type']]: string } = {
    sale: 'bg-teal-500',
    timebonus: 'bg-orange-700',
    discount: 'bg-red-700',
  }

  return (
    <div className={`flex ${borderColors[couponFrame.type]} flex-row rounded-lg border border-solid bg-white-300`}>
      <div
        className={`flex ${bookableColors[couponFrame.type]} size-20 flex-col items-center justify-center gap-1 rounded-l-lg bg-black-300`}
      >
        <Image src={`/icons/coupon/${couponFrame.type}.png`} alt={couponFrame.statement} width="24" height="24"></Image>
        <p className="text-white-100">{couponFrame.statement}</p>
      </div>
      <div className="flex grow flex-row justify-between pl-2">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row items-center gap-2">
            <h3 className="text-lg font-bold">{couponFrame.name}</h3>
          </div>
          <p className="text-sm">
            <span className="mr-2 font-bold">사용가능 기간</span>
            {couponFrame.expires}일 남음
          </p>
        </div>
      </div>
    </div>
  )
}

export default StretchedCoupon
