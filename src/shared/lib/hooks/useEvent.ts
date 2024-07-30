import { useRef, useLayoutEffect, useCallback } from 'react'

export function useEvent<T extends (...args: any[]) => any>(fn: T) {
  const fnRef = useRef(fn)

  useLayoutEffect(() => {
    fnRef.current = fn
  }, [fn])

  const eventCb = useCallback((...args: Parameters<T>) => fnRef.current.apply(null, args), [fnRef])

  return eventCb
}
