import React from 'react'
import TodoItem from './TodoItem';

import './scss/TodoMain.scss'

const TodoMain = ( { todoList, remove, check, count }) => {  

  return (
    <ul className='todo-list'>
      {
        todoList.map(todo => <TodoItem key={todo.id} item={todo} remove={remove} check={check} count={count} />)
      }
    </ul>
  )
}

export default TodoMain;