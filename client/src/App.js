import React, { Component } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

class App extends Component {
  state = { todos: [] }

  componentDidMount() {
    // TODO make a call to our rails server to get items
    fetch('/api/items')
      .then(res => res.json())
      .then( todos => this.setState({ todos}) )
  }

  addItem = (name) => {
    // TODO make api call to rails server to add item
    const { todos } = this.state;
    // Generate random id
    const id = Math.floor((1 + Math.random()) * 0x1000).toString()
    this.setState({ todos: [...todos, { id, name }] });
  }

  updateTodo = (id) => {
    // TODO make api call to update todo
    let todos = this.state.todos.map(t => {
      if (t.id === id)
        return { ...t, complete: !t.complete }
      return t;
    });
    // TODO update state
    this.setState({ todos });
  }

  deleteTodo = (id) => {
    // TODO make api call to delete todo
    const { todos } = this.state;
    this.setState({ todos: todos.filter( t => t.id !== id ) })
    // TODO remove it from state
  }

  render() {
    return (
      <div className="container">
        <TodoForm addItem={this.addItem} />
        <TodoList
          todos={this.state.todos}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
          />
      </div>
    );
  }
}

export default App;
