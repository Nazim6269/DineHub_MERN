//internal import
import app from "./app.js";
import connectDB from "./configs/db.js";
import { port } from "./secret.js";

//server is listening here
app.listen(port, async () => {
  console.log(`server is running at http://localhost:${port}`);
  await connectDB();
  //await seedDatabase();
});
