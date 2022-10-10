import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#FF4F00',
      light: '#ff853c',
      dark: '#c30f00'
    },
    secondary: {
      main: '#1446A0',
      dark: '#001f71',
      light: '#5670d2'
    },
    white: {
        main: '#FFF'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default function Palette({children}) {
  return (
    <ThemeProvider theme={theme}>
    {children}
    </ThemeProvider>
  );
}