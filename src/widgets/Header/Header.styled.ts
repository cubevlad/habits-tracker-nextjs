import { Stack } from '@mui/material'

import { styled } from '@shared/lib'

export const StyledHeader = styled(Stack)<{ $isSticky?: boolean }>`
  direction: ltr;
  min-height: 3rem;
  position: sticky;
  top: 0px;
  z-index: 10;
  background-color: ${({ theme }) => theme.palette.background.default};
  box-shadow: ${({ $isSticky, theme }) => ($isSticky ? theme.palette?.shadow?.y : undefined)};
`
