import { alpha, PaletteColorOptions, PaletteOptions } from '@mui/material/styles';
import { green, grey, orange, red } from './colors';

declare module '@mui/material/styles' {
  interface GradientOptions {
    [key: string]: string;
  }

  interface PaletteOptions {
    neutral?: PaletteColorOptions;
    gradients?: GradientOptions;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
  interface Palette {
    neutral: PaletteColor;
    gradients: PaletteGradients;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
  interface PaletteGradients {
    blueGradient: string;
    whiteGradient: string;
    whiteCardGradient: string;
    bgGradient: string;
  }
}

const palette: PaletteOptions = {
  action: {
    active: grey[500],
    hover: alpha(grey[600], 0.13),
    selected: grey[100],
    disabled: grey[400],
    disabledBackground: grey[200],
    focus: grey[300],
    hoverOpacity: 0.05,
  },
  background: { default: '#fbfaf6', paper: '#ffffff' },
  neutral: {
    light: '#eff4df',
    main: '#64716c',
    dark: '#315448',
    contrastText: '#ffffff',
  },
  primary: {
    lighter: '#dff08c',
    light: '#a9c45a',
    main: '#1e493c',
    dark: '#15372d',
    darker: '#19352e',
    contrastText: '#ffffff',
  },
  secondary: {
    lighter: '#eff4df',
    main: '#88a137',
    contrastText: '#19352e',
  },
  error: { main: red[500] },
  warning: {
    light: orange[100],
    main: orange[500],
    dark: orange[700],
    contrastText: '#ffffff',
  },
  success: {
    lighter: green[50],
    light: green[300],
    main: green[500],
    dark: green[700],
    darker: green[800],
  },

  grey,
  text: {
    primary: '#19352e',
    secondary: '#64716c',
    disabled: '#a2a6b0',
  },
  divider: grey[100],
  gradients: {
    blueGradient: 'linear-gradient(to top right, #1e493c 30%, #315448)',
    whiteGradient: 'linear-gradient(to bottom, rgba(255, 255, 255, .1) 0%, transparent)',
    whiteCardGradient:
      'linear-gradient(to bottom right, rgba(255, 255, 255, 0.15) 0%, transparent)',
    bgGradient: 'linear-gradient(to right bottom, #fbfaf6, #eff4df)',
  },
};

export default palette;
