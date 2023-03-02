import { objectType } from 'nexus'

export const Weather = objectType({
  name: 'Weather',
  definition(t) {
    t.ts('_ts')
    t.string('condition_description')
    t.int('humidity')
    t.int('pressure')
    t.ts('sunset')
    t.float('temperature')
    t.int('wind_degrees')
    t.float('wind_speed')
    t.int('cloudiness')
    t.int('rain')
    t.ts('sunrise')
    t.float('feels_like')
    t.int('visibility')
    t.string('city_id')
    t.string('condition_main')
  }
})
