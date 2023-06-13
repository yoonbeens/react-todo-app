import React from 'react'

import './scss/TodoHeader.scss'

const TodoHeader = () => {
  return (
    <header>
      <h1>2023년 6월 13일</h1>
      <div className='day'>화요일</div>
      <div className='tasks-left'>할 일 x개 남음</div>
    </header>
  )
}

export default TodoHeader;