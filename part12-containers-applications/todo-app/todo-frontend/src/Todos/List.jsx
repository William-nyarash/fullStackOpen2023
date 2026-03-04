import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map((todo) => (
        <React.Fragment key={todo._id}>
          <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
          <hr />
        </React.Fragment>
      ))}
    </>
  );
};


export default TodoList;

