import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //delete todo function
  //deleteボタンを押したdiscriptionを消したいから、idで判別してサーバーにアクセスしてデータベースから削除する。
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
        method: "DELETE",
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));

      console.log(deleteTodo);
    } catch (err) {
      console.error(err.messeage);
    }
  }

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos")
      const jsonData = await response.json();

      setTodos(jsonData);
      
    } catch (err) {
      console.error(err.messeage);
    }
  };

  useEffect(() => {
    getTodos();
  },[]);

  console.log(todos);

  return <Fragment>
    <h1>List Todos</h1>
    <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {todos.map((todo) => (
        <tr key={todo.todo_id}>
          <td>{todo.description}</td>
          {/* EditTodoファイルに値を渡すためにtodo={todo}で各要素を指定している。 */}
          <td><EditTodo todo={todo} /></td>
          <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>


  </Fragment>
}

export default ListTodos;