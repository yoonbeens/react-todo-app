import React from 'react'
import {Button, Container, Grid,
    TextField, Typography, Link} from "@mui/material";

import { API_BASE_URL as BASE, USER } from '../../config/host-config';


const Login = () => {

    const REQUEST_URL = BASE + USER + '/signin';

    //서버에 비동기 로그인 요청
    //함수 앞에 async를 붙이면 해당 함수는 프로미스 객체를 바로 리턴합니다
    const fetchLogin = async() => {

        //사용자가 입력한 이메일, 비밀번호 입력 태그 얻어오기
        const $email = document.getElementById('email');
        const $password = document.getElementById('password');        

        //await는 async로 선언된 함수에서만 사용이 가능합니다.
        //await는 프로미스 객체가 처리될 때까지 기다립니다.
        //프로미스 객체의 반환값을 바로 활용할 수 있게 도와줍니다.
        //then()을 활용하는 것보다 가독성이 좋고 쓰기도 좋습니다.
        const res = await fetch(REQUEST_URL, {
            method: 'POST',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify({
            email: $email.value,
            password: $password.value
            })
        });

        if(res.status === 400) {
            const text = await res.text();
            alert(text);
            return;
        }

        const json = await res.json();
        console.log(json);

    //     fetch(REQUEST_URL, {
    //         method: 'POST',
    //         headers: { 'content-type' : 'application/json'},
    //         body: JSON.stringify({
    //             email: $email.value,
    //             password: $password.value
    //         })
    //     })
    //     .then(res => {
    //         if(res.status === 400) { // 가입이 안되어 있거나, 비번 틀린 경우
    //             return res.text();
    //         }
    //         return res.json();
    //     })
    //     .then(result => {
    //         if(typeof result === 'string') {
    //             alert(result);
    //             return;
    //         }
    //         console.log(result);
    //     });
     }


    //로그인 요청 핸들러
    const loginHandler = e => {
        e.preventDefault();

        // 서버에 로그인 요청 전송
        fetchLogin();

    }


    return (
        <Container component="main" maxWidth="xs" style={{ margin: "200px auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                </Grid>
            </Grid>
    
            <form noValidate onSubmit={loginHandler}>
    
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="email address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="on your password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            로그인
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
      );

}

export default Login