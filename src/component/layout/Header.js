import React from 'react'
import {AppBar, Toolbar, Grid, 
    Typography, Button} from "@mui/material";
import './header.css'
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <AppBar position="fixed" style={{
            background: '#38d9a9',
            width: '100%'
        }}>
            <Toolbar>
                <Grid justify="space-between" container>
                    <Grid item flex={9}>
                        <div style={
                            {
                                display:'flex',
                                alignItems: 'center'
                            }
                        }>
                            <Typography variant="h4">오늘의 할일</Typography>   
                        </div>
                    </Grid>

                    <Grid item>
                        <div className='btn-group'>
                            <Link to='/login'>로그인</Link>
                            <Link to='/join'>회원가입</Link>
                        </div>
                    </Grid>
    
                </Grid>
            </Toolbar>
        </AppBar>
    );

}

export default Header