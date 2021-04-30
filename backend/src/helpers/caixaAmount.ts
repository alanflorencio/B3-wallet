
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const caixaAmount = async () => {

  const data = await prisma.caixa.findMany({
    where: {
      status: false
    }
  })

  let amountCaixa = data.reduce(( acumulador: any, caixa: any ) => {

    let totalCrypto = caixa.qty * caixa.purchasePrice
    let total = totalCrypto + acumulador;

    return total
  }, 0);

  amountCaixa = JSON.stringify(amountCaixa)

  // await prisma.wallet.update({
  //   where: { id: 1 },
  //   data: {
  //     amountCaixa,
  //   },
  // })
}

export default caixaAmount

