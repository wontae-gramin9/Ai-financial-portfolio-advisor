import localFont from 'next/font/local'
import { ApolloWrapper } from '@/app/ApolloWrapper'
import '@/app/globals.css'
import NoneAuthHeader from '@/components/organisms/Header/NoneAuth'

export const metadata = {
  title: {
    default: '궁극의 창작공간',
  },
  description: '궁극의 창작공간',
  icons: {
    icon: '../../favicon.ico',
  },
}

const PRETENDARD_FONT = localFont({ src: '../../../static/fonts/Pretendard.woff2' })

export default function NoneAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={PRETENDARD_FONT.className}>
      <body className="text-black-700">
        <ApolloWrapper>
          <div className="container mx-auto h-lvh bg-white-100">
            <main>
              <NoneAuthHeader />
              <div className="container px-4 py-2">
                <div className="m-auto flex max-w-screen-md flex-col gap-2 py-1">{children}</div>
              </div>
            </main>
          </div>
        </ApolloWrapper>
      </body>
    </html>
  )
}
