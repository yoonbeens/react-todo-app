import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md';
import cn from 'classnames';

import './scss/TodoInput.scss'

const TodoInput = ({ addTodo }) => {

  //입력창이 열리는 여부를 표현하는 상태값
  const [open, setOpen] = useState(false);

  //할 일 입력창에 입력한 내용을 표현하는 상태값
  const [todoText, setTodoText] = useState('');

  //+버튼 클릭 시 이벤트 처리
  const onToggle = () => {
    setOpen(!open);
  }

  //submit 이벤트 핸들러
  const submitHandler = e => {
    e.preventDefault(); //태그의 기본 기능 제한
    // console.log('폼이 제출됨!');

    addTodo(todoText);

    //입력이 끝나면 입력창 비우기
    setTodoText('');

    
  }

    //input change 이벤트 핸들러 함수
    const todoChangeHandler= e => {
      // console.log(e.target.value);
      setTodoText(e.target.value);
    }




  return (
    <>
      {
        open && (
          <div className='form-wrapper'>
            <form className='insert-form' onSubmit={submitHandler}>
                <input 
                  type='text'
                  placeholder='할 일을 입력 후, 엔터를 누르세요!'
                  onChange={todoChangeHandler}
                  value={todoText}
                />
            </form>
          </div>
        )
      }
      {/*
        cn() : 첫번째 파라미터는 항상 유지할 default 클래스
               두 번째 파라미터는 논리 상태값
               => 논리 상태값이 true일 경우 해당 클래스 추가
                  false일 경우 제거.
                  {클래스이름 : 논리값(변수명)},
                  클래스이름 지정 안할 시 변수명이 클래스 이름으로 사용
      */}
      <button className={cn('insert-btn', {open})} onClick={onToggle}>
          <MdAdd />
      </button>
    </>
  )
}

export default TodoInput;