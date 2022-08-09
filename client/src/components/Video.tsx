import styled from "styled-components";
import { Grid } from "@mui/material";


const StyledGrid = styled(Grid)`

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export function Video({ user }: { user: any }) {
    return (
        <StyledGrid container>
            <Grid item xs={12} className='center'>
                <video id="videoPlayer" controls width={800}>
                    <source src={`/video?token=${user.token}`} type="video/mp4" />
                </video>
            </Grid>
        </StyledGrid>
    )
}