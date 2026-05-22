import Image from 'next/image'
import Link from 'next/link'

export default async function NoneAuthHeader() {
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
    </div>
  )
}
