import { PrismaClient } from '@prisma/client'
import { Router } from "express";
import * as  walletControllers from "../controllers/walletControllers"
import amount from "../helpers/amount";

const prisma = new PrismaClient()

const walletRoutes = Router();

walletRoutes.get('/wallet', async (req, res) => { 

  walletControllers.index

  const data = await prisma.wallet.findMany({
    where: { status: false },
    include: { walletAmount: true },
  })

  await amount();

  
  res.json(data)
})

walletRoutes.get('/wallet/:id', async (req, res) => {

  const id =  req.params.id;

  await amount();

  const market: object | null = await prisma.wallet.findUnique({
    where: {
      id: Number(id)
    },
    include: { walletAmount: true },
  })

  res.json(market)
});

walletRoutes.post('/wallet', async (req, res) => {
  const { name } = req.body
  const result = await prisma.wallet.create({
    data: {
      name
    },
  })

  res.json(result)
})

export default walletRoutes;
