import { styled as muiStyled } from '@mui/material/styles'
import type { CreateMUIStyled } from '@mui/system'

import type { ExtendedTheme } from '@/shared/types'

export const styled: CreateMUIStyled<ExtendedTheme> = muiStyled as CreateMUIStyled<ExtendedTheme>
