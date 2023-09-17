import { fastify } from "fastify";
import {fastifyCors} from "@fastify/cors";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoPost } from "./routes/upload-video";
import { createTranscriptionRoute } from "./routes/create-transcription";
import { generateCompletionRoute } from "./routes/generate-completion";

const app = fastify();

app.register(fastifyCors, {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
});

app.register(getAllPromptsRoute);
app.register(uploadVideoPost);
app.register(createTranscriptionRoute);
app.register(generateCompletionRoute);


app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server Running");
  });
