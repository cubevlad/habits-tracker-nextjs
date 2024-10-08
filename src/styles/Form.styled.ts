import { Box, Button, Stack, Typography, styled } from '@mui/material'

export const StyledFormWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 2rem;
`

export const StyledTitle = styled(Typography)`
  margin-bottom: 20px;
`

export const StyledForm = styled(Stack)`
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  align-items: center;
`

export const StyledSubmitButton = styled(Button)`
  color: ${({ theme }) => theme.palette.text.primary};
  border-color: ${({ theme }) => theme.palette.text.primary};

  &.Mui-disabled {
    color: ${({ theme }) => theme.palette.text.disabled};
  }
`
