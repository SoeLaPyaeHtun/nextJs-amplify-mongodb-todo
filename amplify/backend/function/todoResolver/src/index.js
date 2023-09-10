

const { getTodos } = require('./todo')


exports.handler = async (event) => {
    switch (event.typeName) {
        case "Query":
          switch (event.fieldName) {
            case "getTodos":
              return await getTodos();
            default:
              throw new Error(`Unknown field: \${event.field}`);
          }
      }
}
