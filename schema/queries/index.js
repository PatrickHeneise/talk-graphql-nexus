import { objectType } from 'nexus'

export const GenericQueries = objectType({
  name: 'Query',
  definition(t) {
    t.list.field({
      name: 'allCities',
      type: 'City',
      resolve: async (_parent, _args, ctx) => {
        return ctx.prisma.city.findMany()
      }
    })
    t.list.field({
      name: 'allWeather',
      type: 'Weather',
      resolve: async (_parent, _args, ctx) => {
        return ctx.tdEngine.fetchData('select * from weather.weather', [])
      }
    })
  }
})

export * from './cities.js'
export * from './weather.js'
