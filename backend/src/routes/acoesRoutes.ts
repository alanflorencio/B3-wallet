import { PrismaClient } from '@prisma/client'
import { Router } from "express";

const prisma = new PrismaClient()

const acoesRoutes = Router();

acoesRoutes.get('/acoes', async (req, res) => {
  
  const data = await prisma.acoes.findMany({
    where: {
      status: false
    }
  })

  res.json(data)

});

acoesRoutes.get('/acoes/:id', async (req, res) => {

  const id =  req.params.id;

  const market: object | null = await prisma.acoes.findUnique({
    where: {
      id: Number(id)
    }
  })

  res.json(market)

});

acoesRoutes.put('/acoes/:id', async (req, res) => {

  const id =  req.params.id;
  const { name, code, purchasePrice, qty, purchaseDate, status } = req.body;
  const result = await prisma.acoes.update({
    
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

acoesRoutes.delete('/acoes/:id', async (req, res) => {

  const id =  req.params.id;
  const status = req.body.status;

  await prisma.acoes.update(
    { where: 
      { id: Number(id) },
       data: { 
         status 
        } 
      }
    )

  res.status(200).json('')

});

acoesRoutes.post(`/acoes`, async (req, res) => {

  const { name, code, purchasePrice, qty, status, purchaseDate } = req.body

  const result = await prisma.acoes.create({
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

export default acoesRoutes;
