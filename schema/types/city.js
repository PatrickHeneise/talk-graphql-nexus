import { objectType } from 'nexus'

export const City = objectType({
  name: 'City',
  definition(t) {
    t.string('id')
    t.string('name')
    t.float('latitude')
    t.float('longitude')
    t.field('currentWeather', {
      type: 'Weather',
      resolve: async (_parent, _args, ctx) => {
        const sql = `select last_row(*) from weather.weather where city_id = ${_parent.id}`
        const data = await ctx.tdEngine.fetchData(sql)
        return data[0]
      }
    })
    t.list.field('weatherLog', {
      type: 'Weather',
      resolve: async (_parent, _args, ctx) => {
        const sql = `select * from weather.weather where city_id = ${_parent.id} order by _ts desc limit 10`
        return ctx.tdEngine.fetchData(sql)
      }
    })
  }
})
