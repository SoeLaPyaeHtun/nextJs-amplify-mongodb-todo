/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Todo = {
  __typename: "Todo",
  id?: string | null,
  title: string,
  completed?: boolean | null,
};

export type CreateTodoMutationVariables = {
  title: string,
  completed?: boolean | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id?: string | null,
    title: string,
    completed?: boolean | null,
  } | null,
};

export type UpdateTodoMutationVariables = {
  id: string,
  title?: string | null,
  completed?: boolean | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id?: string | null,
    title: string,
    completed?: boolean | null,
  } | null,
};

export type DeleteTodoMutationVariables = {
  id: string,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id?: string | null,
    title: string,
    completed?: boolean | null,
  } | null,
};

export type GetTodosQuery = {
  getTodos?:  Array< {
    __typename: "Todo",
    id?: string | null,
    title: string,
    completed?: boolean | null,
  } | null > | null,
};
