import { PrismaClient } from '@prisma/client'
import { Router } from "express";
import cryptoAmount from "../helpers/cryptoAmount";

const prisma = new PrismaClient()

const cryptoRoutes = Router();

cryptoRoutes.get('/crypto', async (req, res) => {
  
  cryptoAmount()

  const data = await prisma.crypto.findMany({
    where: {
      status: false
    }
  })

  res.json(data)
});

cryptoRoutes.get('/crypto/:id', async (req, res) => {

  const id =  req.params.id;

  const market: object | null = await prisma.crypto.findUnique({
    where: {
      id: Number(id)
    }
  })

  res.json(market)
});

cryptoRoutes.put('/crypto/:id', async (req, res) => {

  const id =  req.params.id;
  const { name, code, purchasePrice, qty, purchaseDate, status } = req.body;
  const result = await prisma.crypto.update({
    
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

cryptoRoutes.delete('/crypto/:id', async (req, res) => {

  const id =  req.params.id;
  const status = req.body.status;

  await prisma.crypto.update(
    { where: 
      { id: Number(id) },
      data: { 
        status 
      } 
    }
  )

  res.status(200).json('')
});

cryptoRoutes.post(`/crypto`, async (req, res) => {

  const { name, code, purchasePrice, qty, status, purchaseDate } = req.body

  const result = await prisma.crypto.create({
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

export default cryptoRoutes;