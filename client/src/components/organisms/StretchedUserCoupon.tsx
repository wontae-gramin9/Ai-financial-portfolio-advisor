import Image from 'next/image'
import type { CouponFrame, UserCoupon } from '@/models/coupon'
import { formatDateString } from '@/utils/format'

const StretchedUserCoupon = (props: { userCoupon: UserCoupon }) => {
  const { userCoupon } = props

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
    <div className={`flex ${borderColors[userCoupon.type.type]} flex-row rounded-lg border border-solid bg-white-300`}>
      <div
        className={`flex ${bookableColors[userCoupon.type.type]} size-20 flex-col items-center justify-center gap-1 rounded-l-lg bg-black-300`}
      >
        <Image
          src={`/icons/coupon/${userCoupon.type.type}.png`}
          alt={userCoupon.type.statement}
          width="24"
          height="24"
        ></Image>
        <p className="text-white-100">{userCoupon.type.statement}</p>
      </div>
      <div className="flex grow flex-row justify-between pl-2">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row items-center gap-2">
            <h3 className="text-lg font-bold">{userCoupon.type.name}</h3>
          </div>
          <p className="text-sm">
            <span className="mr-2 font-bold">만료기간</span>
            {formatDateString(userCoupon.expiresAt)}까지
          </p>
        </div>
      </div>
    </div>
  )
}

export default StretchedUserCoupon
