import Fastify from 'fastify'
import mercurius from 'mercurius'
import explain, { explainGraphiQLPlugin } from 'mercurius-explain'
import nexus from 'nexus'
const { makeSchema } = nexus
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import prismaPlugin from './plugins/prisma.js'
import TdEngine from './lib/tdengine.js'
import dataloaders from './lib/dataloaders.js'
import * as types from './schema/index.js'
import { enableGraphiQL } from './config.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const port = process.env.PORT || 3000
const environment = process.env.NODE_ENV || 'development'
const host = environment === 'development' ? 'localhost' : '0.0.0.0'

const fastify = Fastify()

const tdEngine = new TdEngine(fastify.log)
await fastify.register(prismaPlugin)

const schema = makeSchema({
  types: types,
  outputs: {
    schema: join(__dirname, './schema.graphql'),
    typegen: join(__dirname, './generated-types.d.ts')
  },
  plugins: []
})

const loaders = dataloaders(tdEngine)
fastify.register(mercurius, {
  schema,
  context: () => {
    return {
      prisma: fastify.prisma,
      tdEngine: tdEngine
    }
  },
  loaders,
  graphiql: {
    enabled: enableGraphiQL
    plugins: [explainGraphiQLPlugin()]
  }
})
fastify.register(explain, {})

const start = async () => {
  try {
    await fastify.listen({ port: port, host: host })
  } catch (err) {
    fastify.log.error(err)
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  }
}
start()
