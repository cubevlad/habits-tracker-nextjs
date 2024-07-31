import { useEffect, useState, useRef } from 'react'

export const useOnScreen = (ref: React.MutableRefObject<Element | null>) => {
  const [isOnScreen, setIsOnScreen] = useState<boolean>(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(([entry]) => {
        setIsOnScreen(entry.isIntersecting)
      })
    }
    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    if (ref.current) {
      observerRef.current?.observe(ref.current)
    }
    return () => {
      observerRef.current?.disconnect()
    }
  }, [ref])

  return isOnScreen
}
