import { useMediaQuery } from '@mui/material'

import type { MatchMedia } from '@shared/types'

/**
 * A custom hook that provides media query match information for different screen sizes.
 * It uses the `useMediaQuery` hook to determine whether the viewport matches specific
 * width ranges. The hook is designed to assist in responsive design by indicating
 * which screen size category the current viewport falls into.
 *
 * @returns {Object} An object containing boolean values that indicate whether the viewport
 * matches each specific media query.
 * @returns {boolean} return.isXXl - `true` if the viewport width is at least 1537px.
 * @returns {boolean} return.isXl - `true` if the viewport width is between 1201px and 1536px.
 * @returns {boolean} return.isLg - `true` if the viewport width is between 901px and 1200px.
 * @returns {boolean} return.isMd - `true` if the viewport width is between 601px and 900px.
 * @returns {boolean} return.isSm - `true` if the viewport width is at most 600px.
 *
 * @example
 * const { isXXl, isXl, isLg, isMd, isSm } = useMatchMedia();
 *
 * if (isXl) {
 *   // Do something for XL screens
 * }
 */
export const useMatchMedia = (): MatchMedia => {
  const isXXl = useMediaQuery('(min-width: 1537px)')
  const isXl = useMediaQuery('(min-width: 1201px) and (max-width: 1536px)')
  const isLg = useMediaQuery('(min-width: 901px) and (max-width: 1200px)')
  const isMd = useMediaQuery('(min-width: 601px) and (max-width: 900px)')
  const isSm = useMediaQuery('(max-width: 600px)')

  return {
    isXXl,
    isXl,
    isLg,
    isSm,
    isMd,
  }
}
