import type { PaletteOptions, Theme } from '@mui/material'

export type ColorModeType = 'dark' | 'light'

export type ExtendedTheme = Theme & {
  palette: ExtendedPaletteOptions
}

export type ExtendedPaletteOptions = PaletteOptions & {
  border?: string
  chip?: {
    habit?: string
    note?: string
  }
  shadow?: {
    y?: string
    x?: string
  }
}
