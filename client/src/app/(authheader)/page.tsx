import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HomeNavSection title="현황">
        <HomeNavButton label="현황" destination="/booth/status" />
      </HomeNavSection>
      <HomeNavSection title="구매">
        <HomeNavButton label="일회권" destination="/ticket/oneoff" />
        <HomeNavButton label="정기권" destination="/ticket/billing" />
      </HomeNavSection>
      <HomeNavSection title="변경">
        <HomeNavButton label="외출" destination="/change/nipout" />
        <HomeNavButton label="퇴실" destination="/change/checkout" />
      </HomeNavSection>
      <HomeNavSection title="예약/문의">
        <HomeExternalLinkButton
          label="네이버"
          destination="https://m.place.naver.com/place/1628245132/ticket?entry=ple"
        />
        <HomeNavButton label="카카오채널" destination={process.env.NEXT_PUBLIC_ULTSPACE_CS!} />
      </HomeNavSection>
    </div>
  )
}

type HomeNavSectionProps = {
  title: string
  children: React.ReactNode
}

const HomeNavSection = (props: HomeNavSectionProps) => {
  return (
    <div className="my-1 flex flex-col gap-3">
      <h2 className="text-xl font-medium">{props.title}</h2>
      <div className="flex gap-2">{props.children}</div>
    </div>
  )
}

type NavButtonProps = {
  label: string
  destination: string
}

const HomeNavButton = (props: NavButtonProps) => {
  return (
    <Link href={props.destination}>
      <div className="flex size-20 items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-500">
        <h3 className="font-medium  text-white-100">
          {props.label.split('\n').map((str, idx) => (
            <p key={idx}>{str}</p>
          ))}
        </h3>
      </div>
    </Link>
  )
}

const HomeExternalLinkButton = (props: NavButtonProps) => {
  return (
    <a href={props.destination}>
      <div className="flex size-20 items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-500">
        <h3 className="font-medium  text-white-100">
          {props.label.split('\n').map((str, idx) => (
            <p key={idx}>{str}</p>
          ))}
        </h3>
      </div>
    </a>
  )
}
