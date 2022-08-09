import { Button, Grid, Tooltip, Typography } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from "styled-components";

const StyledGrid = styled(Grid)`
    display: flex;
    justify-content: center;
    align-items: center;
    
    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .title {
        font-size: 3rem;
    }

    .sub-title {
        font-size: 1.5rem;
    }

    .actions {
        display: flex;
        flex-direction: row;
        justify-content: right;
    }
`

export function Header({ darkMode, setDarkMode, user, setUser }: { darkMode: boolean, setDarkMode: Function, user: any, setUser: any }) {
    return (
        <StyledGrid container>
            <Grid item xs={3} />
            <Grid item xs={6} className='header'>
                <Typography className='title'>BR - Private Law Teacher</Typography>
                <Typography className='sub-title'>Online Courses</Typography>
            </Grid>
            <Grid item xs={3} className='actions'>
                <Tooltip title='Change Mode'>
                    <Button onClick={() => {
                        localStorage.setItem('darkMode', !darkMode ? 'true' : 'false')
                        setDarkMode(!darkMode)
                    }
                    }>
                        <Brightness4Icon fontSize='large' />
                    </Button>
                </Tooltip>
                {user && <Tooltip title='Logout'>
                    <Button onClick={() => {
                        localStorage.removeItem('user')
                        setUser(undefined)
                    }
                    }>
                        <LogoutIcon fontSize='large' />
                    </Button>
                </Tooltip>}
            </Grid>
        </StyledGrid>
    );
}
