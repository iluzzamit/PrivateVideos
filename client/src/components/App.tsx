import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { darkTheme, lightTheme } from "../config/theme";
import { AdminPanel } from "./AdminPanel";
import styled from "styled-components";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Login } from "./Login";
import { Video } from "./Video";
import React from "react";

const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  height: 100%;

  .footer{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

`
function App() {
  const [darkMode, setDarkMode] = React.useState(localStorage.getItem(`darkMode`) === 'true' ? true : false)
  const localStorageUser = localStorage.getItem('user')
  const [user, setUser]: any = React.useState(localStorageUser ? JSON.parse(localStorageUser) : undefined);

  console.log(user)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <StyledGrid container>
        <Grid item xs={12}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} user={user} setUser={setUser} />
        </Grid>
        <Grid item xs={12}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user?.isAdmin ? <AdminPanel user={user} /> : user ? <Video user={user} /> : <Login setUser={setUser} />} />
            <Route path="*" element={<>Hellocsacsa</>} />
          </Routes>
        </BrowserRouter>
          
        </Grid>
        <Grid container item xs={12} className='footer'>
          <Footer />
        </Grid>
      </StyledGrid>
    </ThemeProvider>
  );
}

export default App;
