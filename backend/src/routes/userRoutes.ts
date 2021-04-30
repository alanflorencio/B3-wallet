import { PrismaClient } from '@prisma/client'
import { Router } from "express";

const prisma = new PrismaClient()

const userRoutes = Router();

userRoutes.get('/user', async (req, res) => {
  const allUsers = await prisma.user.findMany()
  res.json(allUsers)
})

userRoutes.post(`/user`, async (req, res) => {
  const { name, email } = req.body
  const result = await prisma.user.create({
    data: {
      name,
      email
    },
  })
  
  res.json(result)
})

export default userRoutes;
