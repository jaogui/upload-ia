import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { fastifyMultipart } from "@fastify/multipart"
import {randomUUID} from 'node:crypto'
import fs from 'node:fs'
import path from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";


 const pump = promisify(pipeline)

export async function uploadVideoPost(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25, //25mb
    }
  })

  app.post("/videos", async (request, reply) => {
      const data = await request.file()

      if(!data){
        return reply.status(400).send({error: 'Nenhum arquivo encontrado.'})
      }

      const extension = path.extname(data.filename)

      if(extension !== '.mp3'){
        return reply.status(400).send({error: 'Tipo inválido de arquivo.'})
      }

      const fileBaseName = path.basename(data.filename, extension)
      const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

      //Config para salvar arquivos localmente
      const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName)
      await pump(data.file, fs.createWriteStream(uploadDestination))

  });
}
