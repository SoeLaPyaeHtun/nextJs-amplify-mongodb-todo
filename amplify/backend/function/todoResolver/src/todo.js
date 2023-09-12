const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb")

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getTodos = async () => {
  try {
    await client.connect();
    const collection = client.db("nothing").collection("todos");
    const results = await collection.find().toArray();
    if (!results) {
      throw new Error("Todos not found");
    }
    const Todos = await Promise.all(
      results.map(async (result) => {
        const todo = {
          id: result._id,
          title: result.title,
          completed: result.completed
        };
        return todo;
      })
    );
    client.close();
    return Todos;
  } catch (error) {
    console.error("Error in getTodos:", error);
    throw error;
  } finally {
    client.close();
  }
};

const createTodo = async (todo) => {
    try {
      await client.connect();
      const collection = client.db("nothing").collection("todos");
      const result = await collection.insertOne(todo);
      const todoId = result.insertedId;

      const actualResult = await client
        .db("nothing")
        .collection("todos")
        .findOne({ _id: todoId });

      if (!actualResult) {
        throw new Error("Todo not found");
      }
      client.close();
      const newTodo = {
        id: actualResult._id,
        title: actualResult.title,
        completed: actualResult.completed,
      };
      return newTodo;
    } catch (error) {
      console.error("Error in createTodo:", error);
      throw error;
    } finally {
      client.close();
    }
  };

  const updateTodo = async (todo) => {
    try {
      await client.connect();
      const collection = client.db("nothing").collection("todos");
      const todoId = todo.id;
      const updatedTodo = {};
      for (const prop in todo) {
        if (prop !== "id") {
          updatedTodo[prop] = todo[prop];
        }
      }
      await collection.updateOne({ _id: new ObjectId(todoId) }, { $set: updatedTodo });
      const actualResult = await client
        .db("nothing")
        .collection("todos")
        .findOne({ _id: new ObjectId(todoId) });
      if (!actualResult) {
        throw new Error("User not found");
      }
      client.close();
      const updateUser = {
        id: actualResult._id,
        title: actualResult.title,
        completed: actualResult.completed
      };
      return updateUser;
    } catch (error) {
      console.error("Error in updateUser:", error);
      throw error;
    } finally {
      client.close();
    }
  };

  const deleteTodo = async (todo) => {
    try {
      await client.connect();
      const collection = client.db("nothing").collection("todos");
      const actualResult = await client
        .db("nothing")
        .collection("todos")
        .findOne({ _id: new ObjectId(todo.id) });
      if (!actualResult) {
        throw new Error("Todo not found");
      }
      const result = await collection.deleteOne({
        _id: new ObjectId(todo.id),
      });

      console.log(`Deleted ${result.deletedCount} document(s).`);
      client.close();
      const deletedTodo = {
        id: actualResult._id,
        title: actualResult.title,
        completed : actualResult.completed
      };
      return deletedTodo;
    } catch (error) {
      console.error("Error in deleteTodo:", error);
      throw error;
    } finally {
      client.close();
    }
   };

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}