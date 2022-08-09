import { Button, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";
import axios from "../config/axios";
import React from 'react';
import { useForm } from "react-hook-form";

const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: center;

  .register-form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`

export function AdminPanel({ user }: { user: any }) {
    const [data, setData] = React.useState([])

    const loadData = async () => {
        try {
            const { data } = await axios.get(`/user?token=${user.token}`);
            setData(data)
        } catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {
        loadData()
    }, [])

    const deleteUser = async (email: string) => {
        try {
            await axios.delete(`/user?token=${user.token}`, { data: { email } })
            loadData()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <StyledGrid container spacing={3}>
            <Grid item xs={12} className='register-form'>
                <Register user={user} refreshData={loadData} />
            </Grid>
            <Grid item xs={8}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>Expiration Date</TableCell>
                                <TableCell>Video</TableCell>
                                <TableCell>User Blocked</TableCell>
                                <TableCell>Admin</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: any) => {
                                return (
                                    <TableRow key={row._id}>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{new Date(row.expireDate).toLocaleDateString("en-US")}</TableCell>
                                        <TableCell>{row.video}</TableCell>
                                        <TableCell>{row.isBlocked ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>{row.isAdmin ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>
                                            {<Tooltip title='Delete'><Button disabled={row.isAdmin} onClick={() => deleteUser(row.email)}><DeleteIcon /></Button></Tooltip>}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </StyledGrid>
    )
}


const StyledForm = styled.form`
    .field {
        margin: 0.5rem
    }
    .submit {
        margin-left: 1rem;
        margin-top: -0.2rem;
    }
`


const Register = ({ user, refreshData }: { user: any, refreshData: Function }) => {
    const [videoNames, setVideoNames] = React.useState([])
    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    const loadData = async () => {
        try {
            const { data } = await axios.get(`/user/videos?token=${user.token}`);
            setVideoNames(data)
        } catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {
        loadData()
    }, [])

    const onSubmit = async ({ email, password, video, expire}: any) => {
        try {
            const data = {
                email,
                password,
                video,
                expireDate: new Date(new Date().setMonth(new Date().getMonth() + expire -1))
            }
            console.log(expire)
            await axios.post(`/user?token=${user.token}`, data);
            refreshData();
            reset();
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <TextField
                className='field'
                label='Email'
                {...register('email', { required: true })}
                size="small"
                error={!!errors.email}
            />
            <TextField
                className='field'
                label='Password'
                {...register('password', { required: true })}
                size="small"
                error={!!errors.password}
            />
            <Select
                className='field'
                displayEmpty
                {...register('video', { required: true })}
                defaultValue=''
                size="small"
                error={!!errors.video}
            >
                <MenuItem disabled value="">
                    <em>Video Name</em>
                </MenuItem>
                {videoNames.map((videoName: string) => <MenuItem key={videoName} value={videoName}>{videoName}</MenuItem>)}
            </Select>
            <Select
                error={!!errors.expire}
                className='field'
                displayEmpty
                {...register('expire', { required: true })}
                defaultValue=''
                size="small"
            >
                <MenuItem disabled value="">
                    <em>Expire</em>
                </MenuItem>
                {[1,2,3,4,5,6].map((expireMonth: number) => <MenuItem key={expireMonth} value={expireMonth}>More {expireMonth} Month</MenuItem>)}
            </Select>
            <Button className='submit' variant='contained' type='submit'>ADD</Button>
        </StyledForm>
    )
}