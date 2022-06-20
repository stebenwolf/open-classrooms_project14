/* import logo from './assets/logo.svg'; */
import NewEmployeeForm from './components/NewEmployeeForm';
import './styles/App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import { Route, BrowserRouter, Routes } from 'react-router-dom';




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
    <div className="App">
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={customTheme}>
            <CssBaseline enableColorScheme />
            <Header />
            <Routes>
              <Route index element={<NewEmployeeForm />} />
              <Route path="/employee-list" element={<EmployeeList />} />
              <Route path="*" element={<NewEmployeeForm />} />
            </Routes>
          </ThemeProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;