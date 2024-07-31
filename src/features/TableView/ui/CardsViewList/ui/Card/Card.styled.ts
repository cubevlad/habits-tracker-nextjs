import { Chip } from '@mui/material'

import { styled } from '@shared/lib'

export const StyledCardWrapper = styled('div')<{
  $disabled?: boolean
  $selected?: boolean
  $isAchieved?: boolean
}>`
  padding: 1rem;
  border: ${({ $selected, theme }) =>
    $selected ? `3px solid ${theme.palette.border}` : `1px solid ${theme.palette.divider}`};
  background-color: ${({ $disabled, $isAchieved, theme }) => {
    if ($disabled) return 'rgba(204, 204, 204, 0.2)'

    return $isAchieved ? theme.palette.info.main : 'unset'
  }};

  @media screen and (max-width: 600px) {
    height: 100px;
  }
`

export const StyledChip = styled(Chip)<{ $key: 'habit' | 'note' }>`
  width: 8px;
  height: 8px;
  background-color: ${({ theme, $key }) => theme.palette.chip?.[$key]};
`
