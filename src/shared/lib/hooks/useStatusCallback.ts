import { useCallback, useMemo } from 'react'

import type { CallbackConstraint } from '@shared/types'

import { useBoolean } from './useBoolean'

export const useStatusCallback = <T extends CallbackConstraint>(callback: T) => {
  const { value: isPending, setTrue: startTransition, setFalse: endTransition } = useBoolean()

  const wrappedCallback = useCallback(
    async (...args: Parameters<T>) => {
      startTransition()
      try {
        await callback(...args)
      } finally {
        endTransition()
      }
    },
    [callback, endTransition, startTransition]
  )

  return useMemo(
    () => ({
      isPending,
      wrappedCallback,
    }),
    [wrappedCallback, isPending]
  )
}
