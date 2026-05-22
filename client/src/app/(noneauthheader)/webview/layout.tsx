import localFont from 'next/font/local'
import { ApolloWrapper } from '@/app/ApolloWrapper'
import '@/app/globals.css'

const PRETENDARD_FONT = localFont({ src: '../../../static/fonts/Pretendard.woff2' })

export default function NoneAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={PRETENDARD_FONT.className}>
      <body className="text-black-700">
        <ApolloWrapper>
          <div className="container mx-auto h-lvh bg-white-100">
            <main>
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
