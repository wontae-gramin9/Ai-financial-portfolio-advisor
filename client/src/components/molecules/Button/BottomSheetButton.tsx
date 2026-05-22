type BottomSheetButtonProps = {
  form?: boolean
  onClick?: () => void
  children: React.ReactNode
}

function BottomSheetButton({ onClick, children, form = false }: BottomSheetButtonProps) {
  const type = form ? 'submit' : 'button'
  return (
    <button type={type} onClick={onClick} className="rounded-full bg-white-100 px-10 py-2 font-bold text-black-700">
      {children}
    </button>
  )
}

export default BottomSheetButton
