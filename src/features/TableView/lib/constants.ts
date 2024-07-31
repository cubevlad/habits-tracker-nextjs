import type { MatchMedia } from '@shared/types'

const DAYS_IN_WEEK = 7
const WEEK_IN_MONTH = 5

export const MAX_ITEMS_LENGTH_AVAILABLE_TO_RENDER = DAYS_IN_WEEK * WEEK_IN_MONTH

export const TABLE_BREAKPOINTS: Record<keyof MatchMedia, number> = {
  isXXl: 0,
  isXl: 600,
  isLg: 900,
  isSm: 1536,
  isMd: 1200,
}
