import React from 'react'
import TodoItem from './TodoItem';

import './scss/TodoMain.scss'

const TodoMain = () => {
  return (
    <ul className='todo-list'>
        <TodoItem />
        <TodoItem />
        <TodoItem />
    </ul>
  )
}

export default TodoMain;