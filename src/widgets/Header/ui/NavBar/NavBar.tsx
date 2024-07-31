import { Stack } from '@mui/material'

import { WeatherWidget } from '@features/WeatherWidget'

import { NAV_TABS } from './lib'
import { StyledNavBarWrapper, StyledNavLinkWrapper } from './NavBar.styled'
import { NavLink, ThemeToggler, ViewModeToggler } from './ui'

export const NavBar: React.FC = () => {
  return (
    <StyledNavBarWrapper alignItems='center' direction='row'>
      <StyledNavLinkWrapper direction='row' spacing={2}>
        {NAV_TABS.map(({ to, getIcon }) => (
          <NavLink key={to} getIcon={getIcon} to={to} />
        ))}
      </StyledNavLinkWrapper>
      <Stack alignItems='center' direction='row' spacing={3}>
        <WeatherWidget />
        <ViewModeToggler />
        <ThemeToggler />
      </Stack>
    </StyledNavBarWrapper>
  )
}
