import { fastify } from "fastify";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoPost } from "./routes/upload-video";

const app = fastify();

app.register(getAllPromptsRoute);
app.register(uploadVideoPost);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server Running");
  });
