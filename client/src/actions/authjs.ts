'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authjs'

export async function checkAuthRedirect() {
  const session = await getServerSession(authOptions)
  const userId = session?.userId
  if (!userId) {
    const urlObject = new URL(headers().get('x-url')!)
    const pathname = urlObject.pathname
    const search = urlObject.search
    const encryptedPathname = pathname.replaceAll('/', '^')
    const encryptedSearch = search.replaceAll('&', '-').replaceAll('?', '(').replaceAll('=', ')')
    redirect(`/auth/signin?${encryptedPathname}${encryptedSearch}=0`)
  }
}

export async function getUserIdAfterCheckAuthRedirect() {
  const session = await getServerSession(authOptions)
  const userId = session?.userId
  if (!userId) {
    const urlObject = new URL(headers().get('x-url')!)
    const pathname = urlObject.pathname
    const search = urlObject.search
    const encryptedPathname = pathname.replaceAll('/', '^')
    const encryptedSearch = search.replaceAll('&', '-').replaceAll('?', '(').replaceAll('=', ')')
    redirect(`/auth/signin?${encryptedPathname}${encryptedSearch}=0`)
  } else {
    return userId
  }
}
