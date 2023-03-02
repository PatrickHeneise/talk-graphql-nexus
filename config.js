import invariant from 'tiny-invariant'

invariant(process.env.DATABASE_URL, 'DATABASE_URL must be set')
invariant(process.env.TDENGINE_CLOUD_URL, 'TDENGINE_CLOUD_URL must be set')
invariant(process.env.TDENGINE_DATABASE, 'TDENGINE_DB_NAME must be set')

export const debug = process.env.DEBUG === 'true'
export const production = process.env.NODE_ENV === 'production'
export const development = process.env.NODE_ENV === 'development'

export const tdEngineToken = process.env.TDENGINE_CLOUD_TOKEN
export const tdEngineUrl = process.env.TDENGINE_CLOUD_URL
export const tdEngineDb = process.env.TDENGINE_DATABASE

// feature flags
export const enableGraphiQL = process.env.ENABLE_GRAPHIQL === 'true'
