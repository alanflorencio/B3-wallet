import { PrismaClient } from '@prisma/client'
import { Router } from "express";

const prisma = new PrismaClient()

const caixaRoutes = Router();

caixaRoutes.get('/caixa', async (req, res) => {
  
  const data = await prisma.caixa.findMany({
    where: {
      status: false
    }
  })

  res.status(200).json(data)
});

caixaRoutes.get('/caixa/:id', async (req, res) => {

  const id =  req.params.id;

  const market: object | null = await prisma.caixa.findUnique({
    where: {
      id: Number(id)
    }
  })

  res.status(200).json(market)
});

caixaRoutes.put('/caixa/:id', async (req, res) => {

  const id =  req.params.id;
  const { name, code, purchasePrice, qty, purchaseDate, status, description } = req.body;

  const result = await prisma.caixa.update({
    where: { id: Number(id) },
    data: {
      name,
      code,
      purchasePrice,
      qty,
      purchaseDate,
      status,
      description,
    },
  })

  res.status(200).json(result)
});

caixaRoutes.delete('/caixa/:id', async (req, res) => {

  const id =  req.params.id;
  const status = req.body.status;

  await prisma.caixa.update({
    where: 
      { id: Number(id) },
       data: { 
        status 
      } 
    }
  )

  res.status(200).json('')
});

caixaRoutes.post(`/caixa`, async (req, res) => {

  const { name, code, purchasePrice, qty, status, purchaseDate, description  } = req.body

  const result = await prisma.caixa.create({
    data: {
      name,
      code,
      purchasePrice,
      qty,
      purchaseDate,
      status,
      description,
    },
  })

  res.status(200).json(result)
});

export default caixaRoutes;
