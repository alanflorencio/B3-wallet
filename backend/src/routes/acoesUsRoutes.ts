import { PrismaClient } from '@prisma/client'
import { Router } from "express";

const prisma = new PrismaClient()

const acoesUsRoutes = Router();

acoesUsRoutes.get('/acoesus', async (req, res) => {

  const data = await prisma.acoesUs.findMany({
    where: {
      status: false
    }
  })

  res.json(data)
});

acoesUsRoutes.get('/acoesus/:id', async (req, res) => {
  const id =  req.params.id;
  const market: object | null = await prisma.acoesUs.findUnique({
    where: {
      id: Number(id)
    }
  })
  res.json(market)
});

acoesUsRoutes.put('/acoesus/:id', async (req, res) => {
  const id =  req.params.id;
  const { name, code, purchasePrice, qty, purchaseDate, status } = req.body;
  const result = await prisma.acoesUs.update({
    where: { id: Number(id) },
    data: {
      name,
      code,
      purchasePrice,
      qty,
      purchaseDate,
      status,
    },
  })
  res.json(result)
});

acoesUsRoutes.delete('/acoesus/:id', async (req, res) => {
  const id =  req.params.id;
  const status = req.body.status;
  await prisma.acoesUs.update(
    { where: 
      { id: Number(id) },
       data: { 
         status 
        } 
      }
    )
  res.status(200).json('')
});

acoesUsRoutes.post(`/acoesus`, async (req, res) => {
  const { name, code, purchasePrice, qty, status, purchaseDate } = req.body
  const result = await prisma.acoesUs.create({
    data: {
      name,
      code,
      purchasePrice,
      qty,
      purchaseDate,
      status,
    },
  })
  res.json(result)
});

export default acoesUsRoutes;
