import { Alert, Button, Grid, IconButton, TextField } from "@mui/material";
import styled from "styled-components";
import axios from "../config/axios";
import React from "react";


const StyledGrid = styled(Grid)`
    margin-top: 3rem;

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
    }

    .error {
        display: flex;
        flex-direction: column;
    }
`

export function Login({ setUser }: { setUser: Function }) {
    const [email, setEmail] = React.useState(undefined);
    const [password, setPassword] = React.useState(undefined);
    const [error, setError] = React.useState(undefined);

    const submit = async () => {
        try {
            const { data } = await axios.post('/login', { email, password });
            localStorage.setItem('user', JSON.stringify(data))
            setUser(data);
        } catch (e: any) {
            setError(e);
        }
    }

    return (
        <StyledGrid container spacing={1}>
            <Grid item xs={12} className='center'>
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} className='center'>
                <TextField
                    label="Password"
                    value={password}
                    type='password'
                    onChange={(e: any) => setPassword(e.target.value)}
                />
            </Grid>
            {error && (
                <Grid item xs={12} className='center error'>
                    <Alert severity="error">One of the fields is incorrect!</Alert>
                </Grid>
            )}
            <Grid item xs={12} className='center'>
                <Button onClick={submit} variant='contained' color='primary'>LOGIN</Button>
            </Grid>
            <Grid item xs={12} className='center error'>
                <Alert severity="info" >Have any troubles? contact us at 0525832058</Alert>
            </Grid>
        </StyledGrid>
    )
}