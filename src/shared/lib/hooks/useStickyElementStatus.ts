import { useState, useEffect } from 'react'

export const useStickyElementStatus = (direction: 'X' | 'Y' = 'X') => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window[`scroll${direction}`] > 0) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [direction])

  return isSticky
}
