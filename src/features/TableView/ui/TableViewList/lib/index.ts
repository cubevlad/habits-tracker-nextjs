import { useEffect, useState } from 'react'

export const useTableScroll = (tableRef: React.MutableRefObject<HTMLDivElement | null>) => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    if (!tableRef.current) return undefined

    const handleScroll = () => {
      if (!tableRef.current) return

      if (tableRef.current.scrollLeft === 0 && isSticky) {
        setIsSticky(false)
        return
      }

      if (tableRef.current.scrollLeft > 10 && !isSticky) {
        setIsSticky(true)
      }
    }

    const tableElement = tableRef.current
    tableElement.addEventListener('scroll', handleScroll)

    return () => {
      if (isSticky) {
        setIsSticky(false)
      }

      tableElement.removeEventListener('scroll', handleScroll)
    }
  }, [isSticky, tableRef])

  return isSticky
}
