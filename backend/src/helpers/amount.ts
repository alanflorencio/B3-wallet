
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const amount = async () => {

  // Acoes
  let data = await prisma.acoes.findMany({
    where: {
      status: false
    }
  })
  
  let amountAcoesJson = data.reduce(( acumulador: any, acoes: any ) => {
  
    let totalAcoes = acoes.qty * acoes.purchasePrice
    let total = totalAcoes + acumulador;
  
    return total
  }, 0);
  
  let amountAcoes = JSON.stringify(amountAcoesJson)
  
  await prisma.wallet.update({
    where: { id: 1 },
    data: {
      amountAcoes,
    },
  })

  // AcoesUs
  data = await prisma.acoesUs.findMany({
    where: {
      status: false
    }
  })

  let amountAcoesUsJson = data.reduce(( acumulador: any, acoesUs: any ) => {

    let totalCrypto = acoesUs.qty * acoesUs.purchasePrice
    let total = totalCrypto + acumulador;

    return total
  }, 0);

  let amountAcoesUs = JSON.stringify(amountAcoesUsJson)

  await prisma.wallet.update({
    where: { id: 1 },
    data: {
      amountAcoesUs,
    },
  })

  //Caixa
  data = await prisma.caixa.findMany({
    where: {
      status: false
    }
  })

  let amountCaixaJson = data.reduce(( acumulador: any, caixa: any ) => {

    let totalCrypto = caixa.qty * caixa.purchasePrice
    let total = totalCrypto + acumulador;

    return total
  }, 0);

  let amountCaixa = JSON.stringify(amountCaixaJson)

  await prisma.wallet.update({
    where: { id: 1 },
    data: {
      amountCaixa,
    },
  })

  // Crypto
  data = await prisma.crypto.findMany({
    where: {
      status: false
    }
  })

  let amountCryptoJson = data.reduce(( acumulador: any, crypto: any ) => {

    let totalCrypto = crypto.qty * crypto.purchasePrice
    let total = totalCrypto + acumulador;

    return total
  }, 0);

  let amountCrypto = JSON.stringify(amountCryptoJson)

  await prisma.wallet.update({
    where: { id: 1 },
    data: {
      amountCrypto,
    },
  })


  // Wallet
  let amount = amountCryptoJson + amountCaixaJson + amountAcoesUsJson + amountAcoesJson;
  amount = JSON.stringify(amount)

  let walletId = 1

  await prisma.wallet.update({
    where: { id: 1 },
    data: {
      amount,
    },
  })
 }

  

export default amount



