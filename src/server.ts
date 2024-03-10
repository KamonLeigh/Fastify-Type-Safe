import { join } from 'node:path'
import Fastify from 'fastify'
import AutLoad from '@fastify/autoload'

const fastify = Fastify({ logger: true })

void fastify.register(AutLoad, {
  dir: join(__dirname, 'routes')
})

fastify.listen({ host: '0.0.0.0', port: 3000 }).catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})
