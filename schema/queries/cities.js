import { extendType, stringArg } from 'nexus'

export const CitiesQueries = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('cityByName', {
      type: 'City',
      args: {
        name: stringArg()
      },
      resolve: (_parent, args, ctx) => {
        return ctx.prisma.city.findUnique({
          where: { name: args.name || undefined }
        })
      }
    })
  }
})
