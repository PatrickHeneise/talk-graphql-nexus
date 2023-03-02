import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const cities = [
  { id: '5128581', name: 'New York', latitude: 40.7128, longitude: -74.006 },
  { id: '146268', name: 'Nicosia', latitude: 35.1856, longitude: 33.3823 },
  { id: '3169070', name: 'Rome', latitude: 41.9028, longitude: 12.4964 },
  { id: '2643743', name: 'London', latitude: 51.5074, longitude: -0.1278 },
  { id: '2988507', name: 'Paris', latitude: 48.8566, longitude: 2.3522 },
  { id: '2950159', name: 'Berlin', latitude: 52.52, longitude: 13.405 }
]

cities.forEach(async (city) => {
  await prisma.city.create({
    data: city
  })
})
