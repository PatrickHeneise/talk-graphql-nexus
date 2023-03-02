'use strict'

import tdengine from '@tdengine/rest'
import { tdEngineToken, tdEngineUrl } from '../config.js'

const { options: tdOptions, connect: tdConnect } = tdengine
tdOptions.query = { token: tdEngineToken }
tdOptions.url = tdEngineUrl

export default function TdEngine() {
  const conn = tdConnect(tdOptions)
  this.cursor = conn.cursor()
}

TdEngine.prototype.fetchData = async function fetchData(sql) {
  const result = await this.cursor.query(sql)
  const data = result.getData()
  const columns = result.getMeta()

  return data.map((r) => {
    const res = {}
    r.forEach((c, idx) => {
      let columnName = columns[idx].columnName
      columnName = columnName.replace(/`/g, '')
      if (columnName.startsWith('last_row')) {
        columnName = columnName.replace('last_row(', '').replace(')', '')
      }
      if (c !== null) {
        res[columnName] = c
      }
    })
    return res
  })
}

TdEngine.prototype.raw = async function raw(sql) {
  const result = await this.cursor.query(sql)
  const data = result.getData()
  const columns = result.getMeta()

  if (!data) {
    return []
  }

  return data.map((r) => {
    const res = {}
    r.forEach((c, idx) => {
      let columnName = columns[idx].columnName
      if (columnName.startsWith('last_row')) {
        columnName = columnName.replace('last_row(', '').replace(')', '')
      }
      if (c !== null) {
        res[columnName] = c
      }
    })
    return res
  })
}
