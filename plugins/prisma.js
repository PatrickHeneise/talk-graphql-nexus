import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

const prismaPlugin = async (server) => {
  if (!server.hasDecorator('prisma')) {
    const prisma = new PrismaClient()

    await prisma.$connect()

    server.decorate('prisma', prisma)

    server.addHook('onClose', async (server) => {
      server.log.info('disconnecting Prisma from DB')
      await server.prisma.$disconnect()
    })
  }
}

export default fp(prismaPlugin)
