import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Karla', 'Spectral'].join(','),
    h1: {
      fontFamily: 'Karla',
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
      fontFamily: 'Spectral',
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

export default theme;
