export function formatCardNumber(cardNumber: string): string {
  const formatted: string =
    cardNumber.slice(0, 4) + ' - ' + cardNumber.slice(4, 8) + ' - ' + '****' + ' - ' + cardNumber.slice(12)

  return formatted
}

export function formatDatetimeString(inputDate: string): string {
  const date = new Date(inputDate)

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Month is zero-based, so add 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const formatted = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`

  return formatted
}

export function formatDateString(inputDate: string): string {
  const date = new Date(inputDate)

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Month is zero-based, so add 1
  const day = date.getDate()

  const formatted = `${year}년 ${month}월 ${day}일`

  return formatted
}

export function formatLeftTimeString(inputTime: string): string {
  const [hours, minutes, seconds] = inputTime.split(':').map(Number)

  let formattedTime = ''
  if (hours > 0) {
    formattedTime += `${hours}시간 `
  }
  if (minutes > 0) {
    formattedTime += `${minutes}분 `
  }
  if (seconds > 0) {
    formattedTime += `${seconds}초`
  }

  return formattedTime.trim()
}
