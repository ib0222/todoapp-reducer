import React, { useReducer, useState } from 'react';
import { List, Input, Button, Typography } from 'antd';

const { Title } = Typography;

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { text: action.payload, id: Date.now() }],
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

const ToDo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };

  const removeTodo = (id) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>To-Do List</Title>
      <Input
        placeholder="Add a new task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onPressEnter={addTodo}
        style={{ marginBottom: 20, width: '300px' }}
      />
      <Button type="primary" onClick={addTodo} style={{ marginBottom: 20 }}>
        Add ToDo
      </Button>
      <List
        bordered
        dataSource={state.todos}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => removeTodo(item.id)}>
                Remove
              </Button>,
            ]}
          >
            {item.text}
          </List.Item>
        )}
        style={{ width: '300px' }}
      />
    </div>
  );
};

export default ToDo;
