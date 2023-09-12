

const { getTodos , createTodo, updateTodo, deleteTodo } = require('./todo')


exports.handler = async (event) => {
    switch (event.typeName) {
        case "Query":
          switch (event.fieldName) {
            case "getTodos":
              return await getTodos();
            default:
              throw new Error(`Unknown field: \${event.field}`);
          }
        case "Mutation":
            switch (event.fieldName) {
                case "createTodo":
                    return await createTodo(event.arguments)
                case "updateTodo":
                    return await updateTodo(event.arguments)
                case "deleteTodo":
                    return await deleteTodo(event.arguments)
                default:
                    throw new Error(`Unknown field: \${event.field}`);
            }
      }
}
