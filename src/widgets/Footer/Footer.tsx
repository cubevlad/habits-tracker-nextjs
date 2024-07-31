import { Typography } from '@mui/material'

import { FOOTER_MESSAGE } from './constants'
import { StyledFooter } from './Footer.styled'

export const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <Typography variant='body1'>{FOOTER_MESSAGE}</Typography>
    </StyledFooter>
  )
}
