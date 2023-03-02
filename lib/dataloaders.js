export default function loaders(tdEngine) {
  return {
    City: {
      currentWeather: {
        async loader(queries) {
          const ids = queries.map((q) => `"${q.obj.id}"`)
          const sql = `select city_id, last_row(*) 
            from weather.weather 
            where city_id in (${ids.join(',')}) 
            partition by city_id`
          const data = await tdEngine.raw(sql)
          return queries.map((q) => {
            return data.filter((d) => d.city_id === q.obj.id)[0]
          })
        }
      },
      weatherLog: {
        async loader(queries) {
          const ids = queries.map((q) => `"${q.obj.id}"`)
          const sql = `select city_id, * 
            from weather.weather 
            where city_id in (${ids.join(',')}) 
            partition by city_id`
          const data = await tdEngine.raw(sql)
          return queries.map((q) => {
            return data.filter((d) => d.city_id === q.obj.id)
          })
        }
      }
    }
  }
}
