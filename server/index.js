import express from "express";
import cors from "cors";
import config from "config";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./models/post/routes.js";
import dalleRoutes from "./models/dalle/routes.js";

const baseUrl = "/api/v1";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

/* routes */
app.use(`${baseUrl}/post`, postRoutes);
app.use(`${baseUrl}/dalle`, dalleRoutes);

/* routes */

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});
const startServer = async () => {
  try {
    connectDB(config.get("connection_uri"));
    app.listen(8080, () =>
      console.log("Server listening on PORT http://localhost:8080")
    );
  } catch (e) {
    console.log(e);
  }
};

startServer();
