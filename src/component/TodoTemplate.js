import React, { useEffect, useState } from 'react'
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoInput from './TodoInput';

import './scss/TodoTemplate.scss';

const TodoTemplate = () => {

  // 서버에 할일 목록(json)을 요청(fetch)해서 받아와야 함.
  const API_BASE_URL = 'http://localhost:8181/api/todos';

  //todos 배열을 상태관리
  const [todos, setTodos] = useState([]);

  // id값 시퀀스 생성 함수
  // const makeNewId = () => {
  //   if(todos.length === 0) return 1;
  //   return todos[todos.length - 1].id + 1;
  // }

  // todoInput에게 todoText를 받아오는 함수
  // 자식 컴포넌트가 부모 컴포넌트에게 데이터를 전달할 때는
  // props 사용이 불가능(매개변수 꼭 선언!) -> props로 함수를 전달
  // 자식 컴포넌트에서 전달 받은 함수를 호출하면서 매개값으로 데이터를 전달.
  const addTodo = todoText => {
    // console.log('할 일 정보: ', todoText);

    const newTodo = {
      title: todoText
    };
    // todos.push(newTodo); (x) -> useState를 사용할 거면 사용 불가


    //리액트의 상태변수는 무조건 setter를 통해서만
    //상태값을 변경해야 랜더링에 적용된다.
    //다만, 상태변수가 불변성(immutable)을 가지기 때문에
    //기존 상태에서 변경은 불가능하고,
    //새로운 상태를 만들어서 변경해야 합니다.

    // const copyTodos = todos.slice();
    // copyTodos.push(newTodo);
    // setTodos(copyTodos);

    // setTodos(todos.concat([newTodo]));
    // setTodos([...todos, newTodo]);

    fetch(API_BASE_URL, {
      method : 'POST',
      headers : { 'content-type' : 'application/json' },
      body : JSON.stringify(newTodo)
    })
    .then(res => res.json())
    .then(json => {
      setTodos(json.todos);
    });
  };

  //할 일 삭제 처리 함수
  const removeTodo = id => {
    // console.log(`삭제대상 id: ${id}`);

    //주어진 배열의 값들을 순회하여 조건에 맞는 요소들만 모아서
    //새로운 배열로 리턴해주는 함수.
    // setTodos(todos.filter(todo => todo.id !== id));

    fetch(`${API_BASE_URL}/${id}`, {
      method : 'DELETE',
    })
    .then(res => res.json())
    .then(json => {
      setTodos(json.todos);
    });
  };

  //할 일 체크 처리 함수
  const checkTodo = (id, done) => {
    // console.log('체크한 Todo ID: ', id);

    // const copyTodos = [...todos];
    // for(let cTodo of copyTodos) {
    //   if(cTodo.id === id) {
    //     cTodo.done = !cTodo.done;
    //   }
    // }

    // setTodos(copyTodos);

    // setTodos(todos.map(todo => todo.id === id ? {...todo, 'done':!todo.done} : todo));

    fetch(API_BASE_URL, {
      method : 'PUT',
      headers : { 'content-type' : 'application/json' },
      body : JSON.stringify({'done' : !done, 'id' : id})
    })
    .then(res => res.json())
    .then(json => setTodos(json.todos));

  };

  //체크가 안된 할일의 개수를 카운트 하기
  const countRestTodo = () => {
    console.log("todos: "+todos);
    console.log("l: "+todos.filter(todo => !todo.done).length);
    //done이 false인 애들의 수를 리턴하자
    return todos.filter(todo => !todo.done).length; 
  };

  useEffect(() => {
    //페이지가 랜더링 됨과 동시에 할 일 목록을 요청해서 뿌려주겠습니다.
    fetch(API_BASE_URL)
      .then(res => res.json())
      .then(json => {
        console.log(json.todos);

        //fetch를 통해 받아온 데이터를 상태 변수에 할당.
        setTodos(json.todos);
      });

  }, []);

  return (
    <div className='TodoTemplate'>
        <TodoHeader count={countRestTodo} />
        <TodoMain todoList={todos} remove={removeTodo} check={checkTodo} />
        <TodoInput addTodo={addTodo} />
    </div>
  );
}

export default TodoTemplate;