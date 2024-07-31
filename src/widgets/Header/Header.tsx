import { useRef } from 'react'

import { ArrowUpward } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { useOnScreen } from '@shared/lib'

import { StyledHeader } from './Header.styled'
import { NavBar } from './ui'

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const isOnScreen = useOnScreen(headerRef)

  const handleClick = () =>
    headerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <StyledHeader ref={headerRef}>
        <NavBar />
      </StyledHeader>
      {isOnScreen ? null : (
        <IconButton
          sx={{
            position: 'fixed',
            bottom: 10,
            right: 10,
            zIndex: 10,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
            width: '3rem',
            height: '3rem',
          }}
          onClick={handleClick}
        >
          <ArrowUpward />
        </IconButton>
      )}
    </>
  )
}
