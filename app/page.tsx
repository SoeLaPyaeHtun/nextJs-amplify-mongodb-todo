"use client";
import { useEffect, useState } from "react";
import { getTodos } from "../src/graphql/queries";
import { createTodo, deleteTodo, updateTodo } from "../src/graphql/mutations";
import { API, Amplify } from "aws-amplify";
import config from "../src/aws-exports";

Amplify.configure(config);

export default function Home() {
  const [todos, setTodo] = useState([]);
  const [ editmode , setEditMode ] = useState("")
  const [ data , setData ] = useState({
    title : "",
    completed : false
  })

  useEffect(() => {
    console.log("hello");
    fetchData();
  }, []);

  // #Retrieve All Todos
  const fetchData = async () => {
    const todo_data = await API.graphql({
      query: getTodos,
    });
    setTodo(todo_data.data.getTodos.reverse());
  };

  const addtodo = () => {
    API.graphql({
      query : createTodo,
      variables: { title: data.title , completed: data.completed },
    })

    setTodo([data,...todos])
  }

  const deletetodo = (_id) => {
    API.graphql({
      query : deleteTodo,
      variables : {
          id : _id
      }
    })
    setTodo(todos.filter(todo => todo.id !== _id));
  }

  const edittodo = (_todo) => {
    _todo.title = data.title
    console.log(_todo)
    API.graphql({
      query : updateTodo,
      variables: {
        id: _todo.id,
        title: data.title
       },
    })

    const newList = todos.map(todo => {
      if(todo.id == _todo.id){
        return {...todo, title: data.title}
      }
      return todo
    })

    setTodo(newList)
    setEditMode("")

  }

  const handleInput = (e) => {
    data.title = e.target.value;
  }

  return (
    <div>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-1/4 mb-5 flex flex-row justify-center">
        <input type="text" onChange={e => handleInput(e)} className="w-2/3 bg-gray-50 mr-5 border 
         border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
         <button onClick={addtodo} className="bg-transparent hover:bg-cyan-500 
                   hover:text-white py-2 px-4 border border-cyan-500 hover:border-transparent rounded">Add Task</button>
        </div>
        
        <div className="w-1/3 h-1/2 overflow-auto">
          {
          todos.map((todo) => (

                editmode !== todo.id ?
                <div
                key={todo.id}
                className="border rounded-lg border-cyan-200 py-5 my-2 flex flex-row justify-between items-center">
                <span className="pl-10">{todo.title}</span>
                <div className="mx-10  w-1/4 flex flex-row justify-between">
                <div>
                  <button className="bg-transparent hover:bg-blue-500 hover:text-white py-2 
                  px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => setEditMode(todo.id)}>edit</button>
                </div>
                <div>
                  <button onClick={() => deletetodo(todo.id)} className="bg-transparent hover:bg-red-500 
                   hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">delete</button>
                </div>
              </div>
              </div>

              :
              <div
              key={todo.id}
              className="border rounded-md border-cyan-200 py-5 my-2 flex flex-row justify-between items-center">
                <div className="pl-8">
              <input type="text" defaultValue={todo.title} onChange={e => handleInput(e)} className="bg-gray-50 border border-gray-300 text-sm 
              rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                dark:focus:ring-blue-500 dark:focus:border-blue-500" /> </div>
              <div className="mx-10  w-1/3 flex flex-row justify-between">
              <div>
                <button className="bg-transparent hover:bg-green-500 hover:text-white py-2 
                px-4 border border-green-500 hover:border-transparent rounded" onClick={() => edittodo(todo)}>update</button>
              </div>
              <div>
                <button className="bg-transparent hover:bg-yellow-500
                 hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded" onClick={() => setEditMode("")}>cancel</button>
              </div>
            </div>
            </div>

          ))
}
        </div>
      </div>
    </div>
  );
}
