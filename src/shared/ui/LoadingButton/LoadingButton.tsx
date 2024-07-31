import { Typography } from '@mui/material'
import type { ButtonProps } from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import { StyledSubmitButton } from '@styles'

type ExtendedButtonProps = {
  isLoading?: boolean
}
type LoadingButtonProps = ButtonProps & ExtendedButtonProps

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  onClick,
  children,
  ...props
}) => {
  return (
    <StyledSubmitButton disabled={isLoading} onClick={onClick} {...props}>
      {isLoading ? (
        <CircularProgress color='primary' size={24} />
      ) : (
        <Typography variant='button'>{children}</Typography>
      )}
    </StyledSubmitButton>
  )
}
