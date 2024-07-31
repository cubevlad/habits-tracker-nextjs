import type { ExtendedPaletteOptions } from '@shared/types'

export const createLightTheme = (): ExtendedPaletteOptions => {
  return {
    mode: 'light',
    primary: {
      main: '#1e81b0',
    },
    secondary: {
      main: '#424242',
    },
    background: {
      default: '#f8f8f8',
      paper: '#f8f8f8',
    },
    text: {
      primary: '#1a1c1e',
      secondary: '#32393f',
      disabled: '#89949c',
    },
    info: {
      main: 'rgb(30, 129, 176, 0.2)',
    },
    divider: '#cdcdcd',
    border: '#873e23',
    chip: {
      habit: '#1e81b0',
      note: '#e28743',
    },
    shadow: {
      y: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
      x: '-14px 0px 13px -11px rgba(34, 60, 80, 0.17) inset',
    },
  }
}

export const createDarkTheme = (): ExtendedPaletteOptions => {
  return {
    mode: 'dark',
    primary: {
      main: '#a166ff',
    },
    secondary: {
      main: '#b0bec5',
    },
    background: {
      default: '#373747',
      paper: '#232635',
    },
    text: {
      primary: '#cdcdcd',
      secondary: '#b9bec3',
      disabled: '#89949c',
    },
    info: {
      main: 'rgb(161, 102, 255, 0.2)',
    },
    divider: '#8998A5',
    border: '#e28743',
    chip: {
      habit: '#a166ff',
      note: '#eab676',
    },
    shadow: {
      y: '0px 5px 10px 2px rgba(0, 0, 0, 0.2)',
      x: '-14px 0px 13px -11px rgba(0, 0, 0, 0.17) inset',
    },
  }
}
