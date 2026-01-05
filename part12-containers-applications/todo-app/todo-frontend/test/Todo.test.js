
import React from 'react';
import {render, screen , fireEvent } from '@testing-library/react';
import TodoList from '../src/Todos/List';

describe("Todo component ", ()=> {

  const todo = [
    {_id:"3sdsfioeu3", text: "Learn React", done: false},
    {_id:"eweew3333rf", text:"Learn Graphql", done:false },
    {_id"seojr32q3ses", text:"Install kali linux", done:true},
  ]

  test("renders todos",()=> {
    render(<Todo todo={todo} deleteTodo={jest.fn()} completeTodo={jest.fn()} />

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("This todo is not done")).toBeInTheDocument();
  })

  test("Calls deleteTodo when delete is clicked", ()=>{
    const deleteMock = jest.fn();
    render(<Todo todo={todo} deleteTodo={deleteMock} completeTodo={jest.fn()} />);

    fireEvent.click(screen.getByText('Delete'));
    expect(deleteMock).toHaveBeenCalledWith(todo);
  });

  test('calls completeTodo when Set as done is clicked', () => {
    const completeMock = jest.fn();
    render(<Todo todo={todo} deleteTodo={jest.fn()} completeTodo={completeMock} />);

    fireEvent.click(screen.getByText('Set as done'));
    expect(completeMock).toHaveBeenCalledWith(todo);
  }); 
})
