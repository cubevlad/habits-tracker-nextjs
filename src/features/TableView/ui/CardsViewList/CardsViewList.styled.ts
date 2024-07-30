import { styled } from '@mui/material'

export const StyledCardsViewWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 100%;
  width: 100%;
  border-radius: 8px;
  border: 2px solid #ccc;

  @media screen and (min-width: 1450px) {
    width: 1440px;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 1rem;
    border: none;
  }
`
