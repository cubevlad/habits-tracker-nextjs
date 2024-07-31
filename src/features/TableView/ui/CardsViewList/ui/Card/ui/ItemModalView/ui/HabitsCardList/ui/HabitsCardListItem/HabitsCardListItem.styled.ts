import { Stack } from '@mui/material'
import { styled } from '@mui/material'

export const StyledHabitsCardListItem = styled(Stack)<{ $achieved?: boolean; $disabled?: boolean }>`
  border: ${({ theme }) => `1px solid ${theme.palette.divider}`};
  background-color: ${({ $achieved, theme, $disabled }) =>
    // eslint-disable-next-line no-nested-ternary
    $disabled
      ? theme.palette.text.disabled
      : $achieved
        ? theme.palette.info.main
        : theme.palette.background.default};
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.5rem 1rem;
  position: relative;

  &:hover {
    border: ${({ theme }) => `1px solid ${theme.palette.primary.main}`};
  }
`

export const StyledIconsWrapper = styled(Stack)`
  height: 100%;
  align-items: center;
  justify-content: center;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 0.5rem;

    & > svg {
      color: ${({ theme }) => theme.palette.text.secondary};
      font-size: 1rem;

      @media screen and (max-width: 600px) {
        font-size: 1.2rem;
      }
    }
  }

  & > div:hover {
    & > svg {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`
