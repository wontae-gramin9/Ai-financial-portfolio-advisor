type ButtonProps = {
  color?: 'teal' | 'red' | 'blue'
  form?: boolean
  onClick?: () => void
  fullWidth?: boolean
  children: React.ReactNode
}

export default function Button({ color = 'blue', form = false, onClick, children, fullWidth = false }: ButtonProps) {
  let borderColor = ''
  let hoverColor = ''
  const type = form ? 'submit' : 'button'
  const width = fullWidth ? 'w-full' : ''
  switch (color) {
    case 'teal':
      borderColor = 'border-teal-700'
      hoverColor = 'hover:bg-teal-300'
      break
    case 'red':
      borderColor = ' border-red-700 '
      hoverColor = 'hover:bg-red-300'
      break
    default:
      borderColor = 'border-blue-700'
      hoverColor = 'hover:bg-blue-300'
      break
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block rounded-lg ${width} border ${borderColor} bg-white-100 px-5 py-2.5 text-sm font-medium ${hoverColor} hover:text-white-100`}
    >
      {children}
    </button>
  )
}
