const Fastify = require('fastify')
const cors = require('@fastify/cors')
const { PrismaClient } = require('@prisma/client')
require('dotenv').config()

const prisma = new PrismaClient()
const fastify = Fastify({ logger: true })

fastify.register(cors)

// Rutas de prueba
fastify.get('/', async (req, reply) => {
  return { ok: true, msg: '🚀 Backend funcionando' }
})

fastify.get('/employees', async (req, reply) => {
  const empleados = await prisma.employee.findMany()
  return empleados
})

fastify.post('/employee', async (req, reply) => {
  const { name, role, salary, salonId } = req.body
  const empleado = await prisma.employee.create({
    data: { name, role, salary, salonId }
  })
  return empleado
})

fastify.listen({ port: 3001 }, (err, address) => {
  if (err) throw err
  console.log(`🚀 Servidor backend corriendo en ${address}`)
})
