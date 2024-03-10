import {
  type FastifyPluginAsyncTypebox,
  Type
} from '@fastify/type-provider-typebox'

const plugin: FastifyPluginAsyncTypebox = async function (fastify, opts) {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['Hello World'],
        description: 'Salute someone via GET call',
        summary: 'GET Hello Route',
        querystring: Type.Object({
          name: Type.String({ default: 'world' })
        }),
        response: {
          200: Type.Object({
            hello: Type.String()
          })
        }
      }
    },
    (req) => {
      const { name } = req.query
      return { hello: name }
    }
  )

  fastify.post(
    '/',
    {
      schema: {
        tags: ['Hello World'],
        description: 'Salute someone via a POST call',
        summary: 'POST Hello Route',
        body: Type.Object({
          name: Type.Optional(Type.String())
        }),
        response: {
          200: Type.Object({
            hello: Type.String()
          })
        }
      }
    },
    async (req) => {
      const { name } = req.body
      const hello = typeof name !== 'undefined' && name !== '' ? name : 'world'

      return { hello }
    }
  )
}

export default plugin
