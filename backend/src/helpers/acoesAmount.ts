
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const acoesAmount = async () => {

  const data = await prisma.acoes.findMany({
    where: {
      status: false
    }
  })
  
  let amount = data.reduce(( acumulador: any, acoes: any ) => {
  
    let totalAcoes = acoes.qty * acoes.purchasePrice
    let total = totalAcoes + acumulador;
  
    return total
  }, 0);
  
  let amountAcoes = JSON.stringify(amount)
  
  // await prisma.wallet.update({
  //   where: { id: 1 },
  //   data: {
  //     amountAcoes,
  //   },
  // })

  return amount
}

export default acoesAmount



