import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  typography: {
    fontFamily: ['Karla', 'Spectral'].join(','),
    h1: {
      fontFamily: 'Karla',
      letterSpacing: 1.5,
    },
    h2: {
      fontFamily: 'Karla',
    },
    h3: {
      fontFamily: 'Karla',
    },
    h4: {
      fontFamily: 'Karla',
    },
    h5: {
      fontFamily: 'Karla',
    },
    h6: {
      fontFamily: 'Karla',
      textTransform: 'uppercase',
      letterSpacing: 1.5,
    },
    body1: {
      fontFamily: 'Spectral',
    },
    body2: {
      fontFamily: 'Karla',
    },
    caption: {
      fontFamily: 'Spectral',
    },
    button: {
      fontFamily: 'Karla',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#545E56',
    },
    secondary: {
      main: '#B79492',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
