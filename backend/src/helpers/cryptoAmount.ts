import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const cryptoAmount = async () => {

  const data = await prisma.crypto.findMany({
    where: {
      status: false
    }
  })

  let amountCrypto = data.reduce(( acumulador: any, crypto: any ) => {

    let totalCrypto = crypto.qty * crypto.purchasePrice
    let total = totalCrypto + acumulador;

    return total
  }, 0);

  amountCrypto = JSON.stringify(amountCrypto)

  // await prisma.wallet.update({
  //   where: { id: 1 },
  //   data: {
  //     amountCrypto,
  //   },
  // })

  return amountCrypto;
}

export default cryptoAmount