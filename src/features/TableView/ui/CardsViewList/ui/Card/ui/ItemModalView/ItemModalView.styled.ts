import { Box, Button } from '@mui/material'
import { styled } from '@mui/material'

export const StyledItemModalViewWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: flex;
  flex-direction: column;
`

export const StyledFormButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`
