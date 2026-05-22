import { useEffect, useState } from 'react'

const useIsReactNativeWebview = () => {
  const [isReactNativeWebview, setIsReactNativeWebView] = useState(false)

  useEffect(() => {
    if (window.ReactNativeWebView) setIsReactNativeWebView(true)
  }, [])

  return isReactNativeWebview
}

export default useIsReactNativeWebview
