/// <reference path="../../../typedefs/npm-react-router/react-router.d.ts" />
import * as React from 'react';
import { connect } from 'react-redux';
import { Router, withRouter, IInjectedProps } from 'react-router';

import { TodosState, TodoItemState, Visibility, stringToVisibility } from '../state';
import { completeTodo, CompleteTodoFunc } from '../actions';


const getVisibleTodos = (todos: TodoItemState[], visibility: Visibility) :TodoItemState[] => {
    switch (visibility) {
        case 'all':
            return todos;
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t =>  t.completed);
    }
};

interface TodoProps {
    onClick: () => void;
    completed: boolean;
    text: string;
}

const Todo = (props: TodoProps) =>
    <li
        onClick={props.onClick}
        style={{ textDecoration: props.completed ? 'line-through' : 'none' }}>
            {props.text}
    </li>;

interface VisibleTodoListProps {
    todos: TodoItemState[];
    completeTodo: CompleteTodoFunc;
}

const mapState = (state: TodosState, ownProps: IInjectedProps) => ({
    todos: getVisibleTodos(
        state.todos,
        stringToVisibility(ownProps.params ? ownProps.params['filter'] : '')
    )
});

const mapDispatch = {
    completeTodo
};

export default withRouter(connect(mapState, mapDispatch)((props: VisibleTodoListProps) => {
    return <ul>
        {props.todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => props.completeTodo(todo.id)} />
        )}
    </ul>;
}));
