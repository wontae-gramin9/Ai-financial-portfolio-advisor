import React from 'react'

function BorderCardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-lg border border-solid bg-white-300 px-1 py-2 ">
      {children}
    </div>
  )
}

export default BorderCardContainer
