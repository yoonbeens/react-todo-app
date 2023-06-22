import React, { useState } from 'react'
import {Button, Container, Grid,
    TextField, Typography, Link} from "@mui/material";

const Join = () => {

    //상태변수로 회원가입 입력값 관리
    const [userValue, setUserValue] = useState({
        userName: '',
        password: '',
        email: ''
    });

    //검증 메세지에 대한 상태변수 관리
    const [message, setMessage] = useState({
        userName: '',
        password: '',
        passwordCheck: '',
        email: ''
    });

    //검증 완료 체크 대한 상태변수 관리
    const [correct, setCorrect] = useState({
        userName: false,
        password: false,
        passwordCheck: false,
        email: false
    });

    //검증 데이터를 상태변수에 저장하는 함수
    const saveInputState = ({key, inputVal, flag, msg}) => {
        
        inputVal !== 'pass' && setUserValue({...userValue, [key]: inputVal});
        
        setCorrect({...correct, [key]: flag});
        
        setMessage({...message, [key]: msg});
    }
    

    //이름 입력창 체인지 이벤트 핸들러
    const nameHandler = e => {

        const nameRegex = /^[가-힣]{2,5}$/;

        //입력한 값을 상태변수에 저장
        const inputVal = e.target.value;

        //입력값 검증
        let msg; //검증 메세지를 저장할 변수
        let flag = false; //입력값 검증 체크 변수

        if(inputVal === '') {
            msg = '유저 이름은 필수입니다';
        } else if(!nameRegex.test(inputVal)) {
            msg = '2~5글자 사이의 한글로 작성하세요!'
        } else {
            msg = '사용 가능한 이름입니다.';
            flag = true;
        }

        //객체 프로퍼티에 세팅하는 '변수'의 이름이 키값과 동일한 경우
        //콜론 생략이 가능(a: a -> a)
        saveInputState({key: 'userName', inputVal, msg, flag})


    };


    //이메일 입력창 체인지 이벤트 핸들러
    const emailHandler = e => {
    
        const inputVal = e.target.value;

        setUserValue({...userValue, email: inputVal});
    
    };
    

    //패스워드 입력창 체인지 이벤트 핸들러
    const passwordHandler = e => {

        //패스워드가 변동되면 패스워드 확인란을 비우기
        document.getElementById('password-check').value = '';
        document.getElementById('check-span').textContent = '';

        setMessage({...message, passwordCheck: ''});
        setCorrect({...correct, passwordCheck: false});
    
        const inputVal = e.target.value;

        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

        //검증 시작
        let msg, flag = false;
        if(!inputVal) { //패스워드 안적음
            msg = '비밀번호는 필수입니다';
        } else if(!pwRegex.test(inputVal)) {
            msg = '8글자 이상의 영문, 숫자, 특수문자를 포함해주세요';
        } else {
            msg = '사용 가능한 비밀번호입니다';
            flag = true;
        }

        saveInputState({key: 'password', inputVal, msg, flag});
    
    };
    
    const pwCheckHandler = e => {
        //검증 시작
        let msg, flag = false;
        if(!e.target.value) {
            msg = '비밀번호 확인란은 필수입니다';
        } else if(userValue.password !== e.target.value) {
            msg = "패스워드가 일치하지 않습니다";
        } else {
            msg = '패스워드가 일치합니다';
            flag = true;
        }

        saveInputState ({
            key: 'passwordCheck',
            inputVal: 'pass',
            msg,
            flag
        });

    }

    const joinButtonClickHandler = e => {
        //기본 기능 정지
        e.preventDefault();
        console.log(userValue);
    };


    return (
        <Container component="main" maxWidth="xs" style={{ margin: "200px auto" }}>
            <form noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            계정 생성
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="유저 이름"
                            autoFocus
                            onChange={nameHandler}
                        />
                        <span style={correct.userName ? {color : 'green'} : {color : 'red'}}>
                            {message.userName}
                        </span>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            name="email"
                            autoComplete="email"
                            onChange={emailHandler}
                        />
                        <span style={correct.email ? {color : 'green'} : {color : 'red'}}>
                            {message.email}
                        </span>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={passwordHandler}
                        />
                        <span style={correct.password ? {color : 'green'} : {color : 'red'}}>
                            {message.password}
                        </span>
                    </Grid>
    
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password-check"
                            label="패스워드 확인"
                            type="password"
                            id="password-check"
                            autoComplete="check-password"
                            onChange={pwCheckHandler}
                        />
                        <span id='check-span' style={correct.passwordCheck 
                            ? {color : 'green'} : {color : 'red'}}>
                            {message.passwordCheck}
                        </span>
                    </Grid>
    
                    <Grid item xs={12}>
                        <Button 
                          type="submit" 
                          fullWidth 
                          variant="contained" 
                          style={{background: '#38d9a9'}}
                          onClick={joinButtonClickHandler}
                        >
                            계정 생성
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            이미 계정이 있습니까? 로그인 하세요.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
      );

}

export default Join