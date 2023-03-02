# GraphQL Schemas with Nexus

## Architecture Overview

### Relational Data

Relational data is stored in Postgres 15 and is accessed via [Prisma](http://prisma.io). The Prisma schema is defined in `prisma/schema.prisma`. The Prisma client is generated in `prisma/generated/client`.

### Time Series Data

Time series data is stored in [TDEngine](http://tdengine.com) and accessed via @tdengine/rest.

The data is collected from OpenWeatherAPI by [Telegraf](https://docs.influxdata.com/telegraf/v1.25/) and stored via the influx output plugin to TDEngine.

## Usage

```
docker compose up
pnpm install
pnpm dev
```

## License

MIT
