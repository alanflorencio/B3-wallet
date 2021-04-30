
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const acoesUsAmount = async () => {

  const data = await prisma.acoesUs.findMany({
    where: {
      status: false
    }
  })

  let amountAcoesUs = data.reduce(( acumulador: any, acoesUs: any ) => {

    let totalCrypto = acoesUs.qty * acoesUs.purchasePrice
    let total = totalCrypto + acumulador;

    return total
  }, 0);

  amountAcoesUs = JSON.stringify(amountAcoesUs)

  // await prisma.wallet.update({
  //   where: { id: 1 },
  //   data: {
  //     amountAcoesUs,
  //   },
  // })

}

export default acoesUsAmount

