import { getUserIdAfterCheckAuthRedirect } from '@/actions/authjs'
import { getAllUserCoupon } from '@/actions/usercoupon'
import BottomSheetButton from '@/components/molecules/Button/BottomSheetButton'
import BottomSheetModal from '@/components/molecules/Modal/BottomSheetModal'
import SubTitle from '@/components/molecules/Title/SubTitle'
import Title from '@/components/molecules/Title/Title'
import StretchedUserCoupon from '@/components/organisms/StretchedUserCoupon'
import { UserCoupon } from '@/models/coupon'

export default async function UserCouponPage() {
  const userId = await getUserIdAfterCheckAuthRedirect()
  const allUserCoupon = await getAllUserCoupon(userId)
  return (
    <>
      <Title text="내 쿠폰 리스트" />
      <SubTitle text="쿠폰을 등록하려면 실물쿠폰의 QR코드를 촬영해주세요." />
      {allUserCoupon.length ? (
        <div className="flex flex-col gap-2">
          <SubTitle text="쿠폰을 클릭하시면 사용하실 수 있습니다." />
          {allUserCoupon.map((userCoupon: UserCoupon) => (
            <BottomSheetModal
              key={userCoupon.id}
              trigger={<StretchedUserCoupon userCoupon={userCoupon}></StretchedUserCoupon>}
              content={
                <div className="flex flex-row justify-center">
                  <BottomSheetButton>사용하기</BottomSheetButton>
                </div>
              }
            ></BottomSheetModal>
          ))}
        </div>
      ) : (
        <SubTitle text="등록된 쿠폰이 없습니다." />
      )}
    </>
  )
}
