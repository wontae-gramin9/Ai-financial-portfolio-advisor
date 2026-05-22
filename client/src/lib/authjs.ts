import { DefaultSession, NextAuthOptions } from 'next-auth'
import { ProviderType } from 'next-auth/providers'
import KakaoProvider from 'next-auth/providers/kakao'
import { addUser, getUser } from '@/gql/user'
import { KakaoProfile, User } from '@/models/user'

declare module 'next-auth' {
  interface Account {
    // 인가 코드로 받는 토큰값 포함
    provider: string
    type: ProviderType
    providerAccountId: string
    access_token: string
    token_type: 'bearer'
    refresh_token: string
    expires_at: number
    scope: string
    refresh_token_expires_in: number
  }

  interface Profile {
    id: number
    connected_at: string
    kakao_account: KakaoProfile
  }

  interface Session extends DefaultSession {
    userId: string
    accessToken: string
  }
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET_KEY!,
  providers: [
    KakaoProvider({
      clientId: process.env.NEXTAUTH_KAKAO_ID!,
      clientSecret: process.env.NEXTAUTH_KAKAO_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const userId = profile?.id.toString()!
      const kakao_account = profile?.kakao_account
      const user = await getUser(userId)
      if (!user) {
        await addUser({
          id: userId,
          name: kakao_account?.name,
          phoneNumber: kakao_account?.phone_number,
          birthyear: kakao_account?.birthyear,
          birthday: kakao_account?.birthday,
          birthdayType: kakao_account?.birthday_type,
          gender: kakao_account?.gender,
        } as User)
      }
      return true
    },
    // called when /api/auth/signin, /api/auth/session, getSession(), getServerSession(), useSession()
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token // token 객체에 다시 담아서 session callback에서 반환
        token.id = profile!.id.toString()
      }
      return token
    },
    // Send properties to the client, like an access_token from a provider.
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.userId = (token.id as number).toString()
      return session
    },
  },
}
