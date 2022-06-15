/* import logo from './assets/logo.svg'; */
import NewEmployeeForm from './components/NewEmployeeForm';
import './styles/App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Illustration from './components/Illustration';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';/* 
import GroupIcon from '@mui/icons-material/Group';
import MoodIcon from '@mui/icons-material/Mood';
import PersonPinIcon from '@mui/icons-material/PersonPin'; */


/* const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
}); */

const customTheme = createTheme({
  palette: {
    primary: {
      light: '#5e92f3',
      main: '#1565c0',
      dark: '#003c8f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff350',
      main: '#ffc107',
      dark: '#c79100',
      contrastText: '#000',
    }
  },
});


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ThemeProvider theme={customTheme}>
      <h1><EmojiPeopleIcon sx={{margin: '10px', marginBottom: '-5px', fontSize: '40px'}} />HRnet</h1>
      <main>
        <div className="App">
          <CssBaseline enableColorScheme />
          <NewEmployeeForm />
        </div>
        <Illustration />
      </main>
    </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
