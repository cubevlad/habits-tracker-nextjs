import { Chip, styled } from '@mui/material'

import { ACHIEVED_COLOR } from '@shared/constants'

export const StyledCardWrapper = styled('div')<{
  $disabled?: boolean
  $selected?: boolean
  $isAchieved?: boolean
}>`
  padding: 1rem;
  border: ${({ $selected, theme }) =>
    $selected ? `2.3px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`};
  background-color: ${({ $disabled, $isAchieved }) => {
    if ($disabled) return 'rgba(204, 204, 204, 0.2)'

    return $isAchieved ? ACHIEVED_COLOR : 'unset'
  }};

  @media screen and (max-width: 600px) {
    height: 100px;
  }
`

export const StyledChip = styled(Chip)`
  width: 8px;
  height: 8px;
`
