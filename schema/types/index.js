import { scalarType } from 'nexus'

export const Timestamp = scalarType({
  name: 'Timestamp',
  asNexusMethod: 'ts',
  description: 'TDEngine Timestamp',
  serialize(value) {
    return new Date(value).getTime()
  }
})

export * from './city.js'
export * from './weather.js'
