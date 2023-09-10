const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getTodos = async () => {
  try {
    await client.connect();
    const collection = client.db("nothing").collection("todos");
    const results = await collection.find({}).toArray();
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

module.exports = {
    getTodos
}