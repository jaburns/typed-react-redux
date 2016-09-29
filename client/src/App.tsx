import * as React from 'react';
import { connect, MapDispatchToPropsObject } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TodosState } from './state';

import {
    addTodo, AddTodoFunc,
    completeTodo, CompleteTodoFunc,
    deleteTodo, DeleteTodoFunc
} from './actions';

interface StateProps {
    todos: TodosState;
}

interface DispatchProps {
    addTodo: AddTodoFunc;
    completeTodo: CompleteTodoFunc;
    deleteTodo: DeleteTodoFunc;
}

export const App = connect(
    (state: TodosState) => ({
        todos: state
    }),{
        addTodo,
        completeTodo,
        deleteTodo
    }
)(_App);

class _App extends React.Component<StateProps & DispatchProps, any> {
    render() {
        let vals = this.props.todos.map(todo => <div>
            <button onClick={() => this.props.deleteTodo(todo.id)}> X </button>
            <li onClick={() => this.props.completeTodo(todo.id)}>
                {todo.text + (todo.completed ? ' X': '')}
            </li>
        </div>);

        return (<div>
            <h1>Todo App</h1>
            <button onClick={() => { this.props.addTodo("new TODO"); }}>
                Add
            </button>
            {vals}
        </div>);
    }
}
