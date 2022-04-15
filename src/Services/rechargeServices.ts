import * as rechargeRepository from "../Repositories/rechargeRepository.js"
import * as cardsRepository from "../Repositories/cardRepository.js"
import * as utils from "../utils/index.js"
import moment from "moment"


export async function recharge(number: string, cardholderName: string, expirationDate: string, cvc: string, amount: number){
  validateExpirationDate(expirationDate)
  
  const {id }  = await utils.getCardDataEndValide(number, cardholderName, expirationDate, cvc)
  const rechargeData = { cardId: id, amount}
  await rechargeRepository.insert(rechargeData)

  return;
}

function validateExpirationDate(date){
  const now = moment().format('MM/YY')
  if(now > date) utils.throwErro('Forbidden', 'Expirated card')
  return
}

