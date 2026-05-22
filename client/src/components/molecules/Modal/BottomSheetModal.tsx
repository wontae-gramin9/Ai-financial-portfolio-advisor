'use client'
import { useEffect, useRef, useState } from 'react'

type BottomSheetModalProps = {
  trigger: React.ReactNode
  content?: React.ReactNode
}

const BottomSheetModal = (props: BottomSheetModalProps) => {
  const { trigger, content } = props
  const [showBottomSheetModal, setShowBottomSheetModal] = useState(false)
  const handleTriggerClicked = () => {
    setShowBottomSheetModal(!showBottomSheetModal)
  }

  const bottomSheetModalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const closeBottomSheetModal = (e: MouseEvent) => {
      if (
        showBottomSheetModal &&
        bottomSheetModalRef.current &&
        !bottomSheetModalRef.current.contains(e.target as Node)
      ) {
        setShowBottomSheetModal(false)
      }
    }

    document.addEventListener('mousedown', closeBottomSheetModal)

    return () => {
      document.removeEventListener('mousedown', closeBottomSheetModal)
    }
  }, [showBottomSheetModal])

  return (
    <div>
      <div className="cursor-pointer" onClick={handleTriggerClicked}>
        {trigger}
      </div>

      <div
        className={`bg-black fixed inset-0 flex items-end justify-center p-4 transition-transform ${
          showBottomSheetModal ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div
          ref={bottomSheetModalRef}
          aria-hidden="true"
          className="fixed bottom-0 left-0 flex w-full flex-col overflow-hidden rounded-t-lg bg-black-700   py-4 text-white-300"
        >
          <div className="flex flex-col gap-6 px-4 py-2">{content}</div>
        </div>
      </div>
    </div>
  )
}

export default BottomSheetModal
