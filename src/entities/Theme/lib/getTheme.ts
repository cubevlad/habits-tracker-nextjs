import type { Theme } from '@mui/material'
import { createTheme, type PaletteMode } from '@mui/material'

import type { ExtendedPaletteOptions } from '@shared/types'

import { createLightTheme, createDarkTheme } from './createPalette'

type ExtendedTheme = Theme & {
  palette: ExtendedPaletteOptions
}

export const getTheme = (mode: PaletteMode = 'light'): ExtendedTheme => {
  return createTheme({
    palette: mode === 'light' ? createLightTheme() : createDarkTheme(),
  }) as ExtendedTheme
}
