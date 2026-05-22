import request, { gql } from 'graphql-request'
import { User } from '@/models/user'

export async function getUser(userId: string) {
  const GET_USER_BY_ID = gql`
    query GetUserById($userId: String!) {
      user(userId: $userId) {
        id
        name
        phoneNumber
        ageRange
        birthday
        birthdayType
        birthyear
        gender
      }
    }
  `

  const data: { user: User[] } = await request(process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!, GET_USER_BY_ID, {
    userId,
  })
  try {
    const user = data.user[0]
    return user
  } catch (e) {
    throw Error('user: 해당 userId를 가진 user가 없습니다.')
  }
}

export async function addUser(user: User) {
  const ADD_USER_MUTATION = gql`
    mutation AddUser(
      $id: String!
      $name: String
      $phoneNumber: String!
      $ageRange: String
      $birthday: String
      $birthdayType: String
      $birthyear: String
      $gender: String
    ) {
      addUser(
        input: {
          id: $id
          name: $name
          phoneNumber: $phoneNumber
          ageRange: $ageRange
          birthday: $birthday
          birthdayType: $birthdayType
          birthyear: $birthyear
          gender: $gender
        }
      ) {
        resultCode
      }
    }
  `
  const data: { addUser: { resultCode: string } } = await request(
    process.env.NEXT_PUBLIC_APOLLO_ROUTER_URL!,
    ADD_USER_MUTATION,
    {
      ...user,
    },
  )
  const resultCode = data.addUser.resultCode
  if (resultCode != '0000') {
    throw Error('AddUser: failed to save user')
  }
  return resultCode
}
