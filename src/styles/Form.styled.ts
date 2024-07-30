import { Box, Button, Stack, Typography, styled } from '@mui/material'

export const StyledFormWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const StyledTitle = styled(Typography)`
  margin-bottom: 20px;
`

export const StyledForm = styled(Stack)`
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
  width: 100%;
`

export const StyledSubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.text.primary};

  &.Mui-disabled {
    background-color: ${({ theme }) => theme.palette.text.disabled};
  }
`
