import {
  createMuiTheme,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3b9979' },
    secondary: { main: '#742650' },
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
