import { Stack } from '@mui/material'
import { styled } from '@mui/material'

export const StyledActionsWrapper = styled(Stack)<{ $height?: number }>`
  align-items: center;
  justify-content: center;
  height: ${({ $height }) => ($height ? `${$height}px` : '100%')};

  & > svg {
    cursor: pointer;
  }
`
