/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Todo = {
  __typename: "Todo",
  id: string,
  title: string,
  completed?: boolean | null,
};

export type GetTodosQuery = {
  getTodos?:  Array< {
    __typename: "Todo",
    id: string,
    title: string,
    completed?: boolean | null,
  } | null > | null,
};
