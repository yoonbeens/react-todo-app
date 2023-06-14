import React from 'react'

import './scss/TodoHeader.scss'

const TodoHeader = ({ count }) => {

  const today = new Date();

  const dateString = today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });

  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });


  return (
    <header>
      <h1>{dateString}</h1>
      <div className='day'>{dayName}</div>
      <div className='tasks-left'>할 일 {count()}개 남음</div>
    </header>
  )
}

export default TodoHeader;